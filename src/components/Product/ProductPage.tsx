import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import { getAllsBasket, getBasketByCategory } from 'src/apis/basket.api'

const ProductPage: React.FC = () => {
  const navigate = useNavigate() // Khởi tạo navigate
  const [page, setPage] = useState(1) // Page bắt đầu từ 1
  const pageSize = 5 // Định kích thước trang

  // Lấy danh sách BasketShell từ API
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getBasketByCategory', page],
    queryFn: () => getBasketByCategory(page, pageSize)
  })

  const baskets = data?.data.result

  // Kiểm tra trạng thái loading hoặc error
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading baskets!</div>

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='text-center mb-8'>
        <h1 className='text-lg font-medium'>Quà Tết Happybox</h1>
        <h2 className='text-3xl font-bold mt-2'>HỘP QUÀ TẾT CAO CẤP</h2>
        <p className='mt-2 text-sm'>
          Hộp quà Tết Happybox được lựa chọn từ những sản phẩm cao cấp, chất lượng thượng hạng cùng với hộp quà được làm
          tỉ mỉ, đẹp và sang trọng, đẳng cấp.
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {/* Render các sản phẩm từ danh sách baskets */}
        {baskets?.elements.map((basket) => (
          <div
            key={basket.id}
            className='border p-4 bg-white cursor-pointer'
            onClick={() => navigate(`/product/${basket.id}`)} // Điều hướng đến chi tiết sản phẩm
          >
            <div className='relative'>
              {/* Kiểm tra nếu images tồn tại và có phần tử */}
              {basket.images && basket.images[0] && (
                <img className='w-full h-auto' height='300' src={basket.images[0].imageUrl} width='300' />
              )}
            </div>
            <h3 className='mt-4 text-sm'>{basket.name}</h3>
            <p className='text-xs text-gray-500'>{basket.price}</p>
            <p className='mt-2 text-red-500 font-bold'>{basket.description} đ</p>
            {basket.quantity && <p className='text-xs line-through'>{basket.status} đ</p>}
          </div>
        ))}
      </div>
      <div className='text-center mt-8'>
        <button className='bg-red-500 text-white px-6 py-2 rounded-full'>XEM THÊM</button>
      </div>
    </div>
  )
}

export default ProductPage
