import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { getBasketByName } from 'src/apis/basket.api'

export default function SearchInput() {
  const [query, setQuery] = useState('')
  const [name, setName] = useState<string | null>(null) // Tên tìm kiếm để gửi API
  const [page, setPage] = useState(1)
  const pageSize = 5

  // Gọi API tìm kiếm giỏ hàng
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getBasketByName', page, name],
    queryFn: () => getBasketByName(page, pageSize, name || ''),
    enabled: !!name // Chỉ gọi API khi có `name`
  })

  const baskets = data?.data.result.elements || [] // API trả về list sản phẩm

  // Xử lý khi người dùng nhập vào ô tìm kiếm
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setName(value) // Cập nhật `name` để gọi API
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading data</div>

  return (
    <div className='relative'>
      <input
        type='text'
        placeholder='Tìm kiếm sản phẩm'
        className='w-full py-3 pl-4 pr-8 rounded bg-[#feffea] text-black text-sm focus:outline-none focus:ring-0'
        value={query}
        onChange={handleInputChange}
      />
      <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800' size={18} />

      {/* Hiển thị danh sách sản phẩm tìm được */}
      {query && (
        <div className='absolute w-full bg-white border border-gray-300 rounded mt-1 max-h-60 overflow-y-auto'>
          {baskets.length > 0 ? (
            baskets.map((product) => (
              <div key={product.id} className='p-2 hover:bg-gray-100 flex items-center'>
                <img src={product.images[0]?.imageUrl} className='w-10 h-10 mr-2' />
                <div>
                  <div className='text-black'>{product.name}</div>
                  <div className='text-gray-500'>{product.price} VND</div>
                </div>
              </div>
            ))
          ) : (
            <div className='p-2 text-gray-500'>Không tìm thấy sản phẩm</div>
          )}
        </div>
      )}
    </div>
  )
}
