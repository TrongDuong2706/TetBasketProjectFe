import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import React, { useState, useRef } from 'react'
import { getBasketByName } from 'src/apis/basket.api'
import { useNavigate } from 'react-router-dom'

export default function SearchInput() {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [noResults, setNoResults] = useState(false) // Track when no results are found
  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const pageSize = 5
  const inputRef = useRef(null)

  const { data, isLoading } = useQuery({
    queryKey: ['getBasketByName', page, query],
    queryFn: () => getBasketByName(page, pageSize, query || ''),
    enabled: !!query,
    onSuccess: (data: any) => {
      if (!data?.data.result.elements.length) {
        setNoResults(true)
      } else {
        setNoResults(false)
      }
    }
  })

  const baskets = data?.data.result.elements.slice(0, 5) || []

  const handleSearchSubmit = () => {
    if (query.trim() !== '') {
      if (baskets.length === 0) {
        setNoResults(true) // Show "No results found" message
      } else {
        window.location.href = `/productlist?search=${encodeURIComponent(query)}` // Navigate and reload
        setShowSuggestions(false) // Hide suggestions after searching
        setNoResults(false) // Reset no-results state
      }
    }
  }

  return (
    <div className='relative w-full'>
      <div className='relative flex'>
        <input
          ref={inputRef}
          type='text'
          placeholder='Tìm kiếm sản phẩm...'
          className='w-full py-3 pl-4 pr-10 rounded border border-gray-300 bg-white text-black text-sm focus:outline-none focus:ring focus:ring-red-400'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowSuggestions(true) // Show suggestions when typing
            setNoResults(false) // Reset no-results state when input changes
          }}
          onFocus={() => setShowSuggestions(true)} // Show suggestions when clicking input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit()
            }
          }}
        />
        <button
          className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500'
          onClick={handleSearchSubmit}
        >
          <Search size={18} />
        </button>
      </div>

      {/* Suggestion List */}
      {query && showSuggestions && baskets.length > 0 && (
        <div className='absolute w-full bg-white border border-gray-300 rounded shadow-lg mt-2 z-50'>
          {isLoading ? (
            <div className='p-3 text-gray-500 text-center'>Đang tải...</div>
          ) : (
            baskets.map((product) => (
              <div
                key={product.id}
                className='flex items-center p-3 hover:bg-gray-100 cursor-pointer transition-all'
                onMouseDown={() => {
                  navigate(`/product/${product.id}`)
                  setShowSuggestions(false) // Hide suggestions after clicking
                }}
              >
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

      {/* No Results Message */}
      {noResults && query && <div className='text-white text-sm mt-2'>Không tìm thấy sản phẩm nào phù hợp.</div>}
    </div>
  )
}
