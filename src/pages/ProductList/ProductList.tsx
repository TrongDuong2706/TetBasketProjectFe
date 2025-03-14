import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getFilterAlcohol } from 'src/apis/basket.api'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/HomeHeader/Header'

export default function ProductList() {
  const [page, setPage] = useState(1)
  const pageSize = 6

  // Các biến lưu giá trị khi chọn lọc
  const [tempName, setTempName] = useState<string | null>(null)
  const [tempMinPrice, setTempMinPrice] = useState<number | null>(null)
  const [tempMaxPrice, setTempMaxPrice] = useState<number | null>(null)
  const [tempCategoryId, setTempCategoryId] = useState<number | null>(null)
  const [tempBasketShellId, setTempBasketShellId] = useState<number | null>(null)
  const [tempHasAlcohol, setTempHasAlcohol] = useState<boolean | null>(null)

  // Các biến chính thức dùng để gọi API (chỉ cập nhật khi bấm "Tìm kiếm")
  const [name, setName] = useState<string | null>(null)
  const [minPrice, setMinPrice] = useState<number | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [basketShellId, setBasketShellId] = useState<number | null>(null)
  const [hasAlcohol, setHasAlcohol] = useState<boolean | null>(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['filterAlcohol', page, name, minPrice, maxPrice, categoryId, basketShellId, hasAlcohol],
    queryFn: () => getFilterAlcohol(page, pageSize, name, minPrice, maxPrice, categoryId, 1, basketShellId, hasAlcohol)
  })

  const products = data?.data.result.elements || []

  const handleSearch = () => {
    setName(tempName)
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
        {/* Bộ lọc sản phẩm */}
        <div className='mb-5 grid grid-cols-4 gap-4 bg-gray-100 p-4 border border-gray-200 rounded-md shadow-md'>
          {/* Lọc theo tên sản phẩm */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Tên sản phẩm</label>
            <input
              type='text'
              placeholder='Nhập tên sản phẩm'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
              onChange={(e) => setTempName(e.target.value || null)}
            />
          </div>

          {/* Lọc theo giá */}
          <div>
            <label className='block text-sm font-medium text-gray-700'>Giá</label>
            <select
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
              onChange={(e) => {
                const value = parseInt(e.target.value, 10)
                switch (value) {
                  case 1:
                    setTempMinPrice(null)
                    setTempMaxPrice(500000)
                    break
                  case 2:
                    setTempMinPrice(500000)
                    setTempMaxPrice(1000000)
                    break
                  case 3:
                    setTempMinPrice(1000000)
                    setTempMaxPrice(2000000)
                    break
                  case 4:
                    setTempMinPrice(2000000)
                    setTempMaxPrice(3000000)
                    break
                  case 5:
                    setTempMinPrice(3000000)
                    setTempMaxPrice(null)
                    break
                  default:
                    setTempMinPrice(null)
                    setTempMaxPrice(null)
                }
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
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
              onChange={(e) => setTempCategoryId(parseInt(e.target.value, 10) || null)}
            >
              <option value=''>Lọc theo thể loại giỏ</option>
              <option value='1'>Giỏ quà lớn</option>
              <option value='2'>Giỏ quà nhỏ</option>
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
          className='mb-5 bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700 transition-all'
          onClick={handleSearch}
        >
          Tìm kiếm
        </button>

        {/* Hiển thị điều kiện lọc */}
        {(name || minPrice || maxPrice || categoryId || basketShellId || hasAlcohol) && (
          <div className='mb-4 p-3 bg-gray-100 border border-gray-300 rounded-md'>
            <strong>Bạn đang lọc theo:</strong>
            {name && <span className='ml-2'>Tên: "{name}"</span>}
            {minPrice !== null && maxPrice !== null && (
              <span className='ml-2'>
                Giá: {minPrice}₫ - {maxPrice}₫
              </span>
            )}
            {categoryId && (
              <span className='ml-2'>Thể loại giỏ: {categoryId === 1 ? 'Giỏ quà lớn' : 'Giỏ quà nhỏ'}</span>
            )}
            {basketShellId && (
              <span className='ml-2'>
                Thể loại vỏ: {basketShellId === 1 ? 'Hộp gỗ' : basketShellId === 2 ? 'Hộp giấy' : 'Hộp thiếc'}
              </span>
            )}
            {hasAlcohol !== null && <span className='ml-2'>{hasAlcohol ? 'Có rượu' : 'Không rượu'}</span>}
          </div>
        )}

        {/* Danh sách sản phẩm */}
        <div className='mt-5 grid grid-cols-3 gap-4'>
          {isLoading ? (
            <p className='text-gray-500'>Đang tải...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className='border p-4 rounded-md shadow-md'>
                <img src={product.images[0]?.imageUrl} className='w-full h-40 object-cover mb-4' />
                <h3 className='text-lg font-semibold'>{product.name}</h3>
                <p className='text-gray-500'>{product.price.toLocaleString()}₫</p>
              </div>
            ))
          ) : (
            <p className='text-gray-500'>Không tìm thấy sản phẩm</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
