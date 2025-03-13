import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { getBasketByName } from 'src/apis/basket.api'

export default function SearchInput() {
  const [query, setQuery] = useState('') // Giá trị tìm kiếm
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]) // Các sản phẩm đã lọc
  const [page, setPage] = useState(1) // Trang bắt đầu từ 1
  const pageSize = 5 // Kích thước trang
  const [name, setName] = useState<string | null>(null) // Tên giỏ hàng để tìm kiếm

  // Gọi API để lấy giỏ hàng theo tên và phân trang
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getBasketByName', page, name],
    queryFn: () => getBasketByName(page, pageSize, name || ''), // Truyền name vào API
    enabled: true // Luôn gọi API khi có sự thay đổi
  })

  const basket = data?.data.result.elements || [] // Lấy sản phẩm từ API

  // Cập nhật sản phẩm khi query thay đổi
  useEffect(() => {
    if (!query) {
      setFilteredProducts(basket) // Nếu không có tìm kiếm, lấy tất cả sản phẩm
    } else {
      setFilteredProducts(
        basket.filter(
          (product) => product.name.toLowerCase().includes(query.toLowerCase()) // Lọc theo tên sản phẩm
        )
      )
    }
  }, [query, basket])

  // Xử lý khi người dùng gõ vào ô tìm kiếm
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value) // Cập nhật giá trị tìm kiếm
    setName(value) // Cập nhật tên để gọi API
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
        <div className='absolute w-full bg-white border border-gray-300 rounded mt-1'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className='p-2 hover:bg-gray-100 flex items-center'>
                <img src={product.images[0]?.imageUrl} alt={product.name} className='w-10 h-10 mr-2' />
                <div>
                  <div className='text-black'>{product.name}</div>
                  <div className='text-gray-500'>{product.price} VND</div>
                </div>
              </div>
            ))
          ) : (
            <div className='p-2 text-gray-500'>No products found</div>
          )}
        </div>
      )}
    </div>
  )
}
