import { useQuery } from '@tanstack/react-query'
import React, { useState, useEffect } from 'react'
import { getFilterAlcohol } from 'src/apis/basket.api'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/HomeHeader/Header'
import { useLocation } from 'react-router-dom'

export default function ProductList() {
  const [page, setPage] = useState(1)
  const pageSize = 6
  const location = useLocation()

  // Lấy giá trị search từ URL
  const queryParams = new URLSearchParams(location.search)
  const searchQuery = queryParams.get('search') || null

  // Các biến lưu giá trị khi chọn lọc
  const [tempMinPrice, setTempMinPrice] = useState<number | null>(null)
  const [tempMaxPrice, setTempMaxPrice] = useState<number | null>(null)
  const [tempCategoryId, setTempCategoryId] = useState<number | null>(null)
  const [tempBasketShellId, setTempBasketShellId] = useState<number | null>(null)
  const [tempHasAlcohol, setTempHasAlcohol] = useState<boolean | null>(null)

  // Các biến chính thức dùng để gọi API
  const [name, setName] = useState<string | null>(searchQuery)
  const [minPrice, setMinPrice] = useState<number | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [basketShellId, setBasketShellId] = useState<number | null>(null)
  const [hasAlcohol, setHasAlcohol] = useState<boolean | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['filterAlcohol', page, name, minPrice, maxPrice, categoryId, basketShellId, hasAlcohol],
    queryFn: () => getFilterAlcohol(page, pageSize, name, minPrice, maxPrice, categoryId, 1, basketShellId, hasAlcohol)
  })

  const products = data?.data.result.elements || []

  const handleSearch = () => {
    setName(searchQuery) // Dùng lại giá trị từ thanh tìm kiếm trên header
    setMinPrice(tempMinPrice)
    setMaxPrice(tempMaxPrice)
    setCategoryId(tempCategoryId)
    setBasketShellId(tempBasketShellId)
    setHasAlcohol(tempHasAlcohol)
    setPage(1)
  }

  return (
    <>
      <Header />
      <div className='mb-5 mt-5 text-center'>
        <h2 className='text-2xl font-bold'>Quà Tết 2025 Cao Cấp</h2>
        <p className='text-sm text-gray-500'>Quà Tết đẹp, sang trọng, ý nghĩa dành cho người thân, bạn bè.</p>
      </div>

      <div className='p-5 flex flex-col items-center mx-auto max-w-screen-lg'>
        {/* Hiển thị điều kiện lọc */}
        {(name || minPrice || maxPrice || categoryId || basketShellId || hasAlcohol) && (
          <div className='mb-4 p-3 bg-gray-100 border border-gray-300 rounded-md w-full'>
            <strong>Bạn đang lọc theo:</strong>
            {name && <span className='ml-2 text-blue-600'>Kết quả tìm kiếm: "{name}"</span>}
            {minPrice !== null && maxPrice !== null && (
              <span className='ml-2 text-blue-600'>
                Giá: {minPrice.toLocaleString()}₫ - {maxPrice ? maxPrice.toLocaleString() : 'trở lên'}₫
              </span>
            )}
            {categoryId && (
              <span className='ml-2 text-blue-600'>
                Thể loại giỏ: {categoryId === 1 ? 'Giỏ quà lớn' : 'Giỏ quà nhỏ'}
              </span>
            )}
            {basketShellId && (
              <span className='ml-2 text-blue-600'>
                Thể loại vỏ: {basketShellId === 1 ? 'Hộp gỗ' : basketShellId === 2 ? 'Hộp giấy' : 'Hộp thiếc'}
              </span>
            )}
            {hasAlcohol !== null && (
              <span className='ml-2 text-blue-600'>{hasAlcohol ? 'Có rượu' : 'Không có rượu'}</span>
            )}
          </div>
        )}

        {/* Bộ lọc sản phẩm */}
        <div className='mb-5 grid grid-cols-4 gap-4 bg-gray-100 p-4 border border-gray-200 rounded-md shadow-md'>
          {/* Lọc theo giá */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Giá</label>
            <select
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
              onChange={(e) => {
                const value = parseInt(e.target.value, 10)
                setTempMinPrice(value === 1 ? null : value * 500000)
                setTempMaxPrice(value === 5 ? null : value * 500000 + 500000)
              }}
            >
              <option value=''>Lọc theo giá</option>
              <option value='1'>Nhỏ hơn 500k</option>
              <option value='2'>500k - 1 triệu</option>
              <option value='3'>1 triệu - 2 triệu</option>
              <option value='4'>2 triệu - 3 triệu</option>
              <option value='5'>Lớn hơn 3 triệu</option>
            </select>
          </div>

          {/* Lọc theo thể loại giỏ */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Thể loại giỏ</label>
            <select
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
              onChange={(e) => setTempCategoryId(parseInt(e.target.value, 10) || null)}
            >
              <option value=''>Lọc theo thể loại giỏ</option>
              <option value='1'>Giỏ quà lớn</option>
              <option value='2'>Giỏ quà nhỏ</option>
            </select>
          </div>

          {/* Lọc theo thể loại vỏ */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Thể loại vỏ</label>
            <select
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
              onChange={(e) => setTempBasketShellId(parseInt(e.target.value, 10) || null)}
            >
              <option value=''>Lọc theo thể loại vỏ</option>
              <option value='1'>Hộp gỗ</option>
              <option value='2'>Hộp giấy</option>
              <option value='3'>Hộp thiếc</option>
            </select>
          </div>

          {/* Lọc theo rượu */}
          <div className='flex items-center mt-6'>
            <input
              type='checkbox'
              className='rounded border-gray-300 focus:ring-indigo-500'
              onChange={(e) => setTempHasAlcohol(e.target.checked)}
            />
            <span className='ml-2 text-lg'>Có rượu</span>
          </div>
        </div>

        {/* Nút tìm kiếm */}
        <button
          className='mb-5 bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700'
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>

        {/* Danh sách sản phẩm */}
        <div className='mt-5 grid grid-cols-3 gap-4'>
          {isLoading ? (
            <p className='text-gray-500'>Đang tải...</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className='border p-4 rounded-md shadow-md'>
                <img src={product.images[0]?.imageUrl} className='w-full h-40 object-cover mb-4' />
                <h3 className='text-lg font-semibold'>{product.name}</h3>
                <p className='text-gray-500'>{product.price.toLocaleString()}₫</p>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
