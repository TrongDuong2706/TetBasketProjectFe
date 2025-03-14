import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { getBasketByName } from 'src/apis/basket.api'

export default function SearchInput() {
  const [query, setQuery] = useState('')
  const [name, setName] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const pageSize = 5

  useEffect(() => {
    const handler = setTimeout(() => {
      setName(query)
    }, 300)
    return () => clearTimeout(handler)
  }, [query])

  const { data, isLoading, isError } = useQuery({
    queryKey: ['getBasketByName', page, name],
    queryFn: () => getBasketByName(page, pageSize, name || ''),
    enabled: !!name
  })

  const baskets = data?.data.result.elements.slice(0, 5) || [] // Giới hạn 5 sản phẩm

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <div className='relative w-full'>
      <div className='relative'>
        <input
          type='text'
          placeholder='Tìm kiếm sản phẩm...'
          className='w-full py-3 pl-4 pr-10 rounded border border-gray-300 bg-white text-black text-sm focus:outline-none focus:ring focus:ring-red-400'
          value={query}
          onChange={handleInputChange}
        />
        <Search className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500' size={18} />
      </div>

      {/* Danh sách sản phẩm tìm kiếm */}
      {query && baskets.length > 0 && (
        <div className='absolute w-full bg-white border border-gray-300 rounded shadow-lg mt-2 z-50'>
          {isLoading ? (
            <div className='p-3 text-gray-500 text-center'>Đang tải...</div>
          ) : (
            baskets.map((product) => (
              <div key={product.id} className='flex items-center p-3 hover:bg-gray-100 cursor-pointer transition-all'>
                <img src={product.images[0]?.imageUrl} className='w-12 h-12 object-cover rounded mr-3 border' />
                <div>
                  <div className='font-semibold text-black'>{product.name}</div>
                  <div className='text-gray-600 text-sm'>{product.price} VND</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
