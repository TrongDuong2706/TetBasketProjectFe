import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getBasketById } from 'src/apis/basket.api' // Sửa API thành getBasketById

const DetailProduct: React.FC = () => {
  // Lấy ID của sản phẩm từ URL
  const { basketId } = useParams()

  // Lấy thông tin chi tiết sản phẩm từ API theo ID
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getBasketById', basketId], // Đảm bảo sử dụng đúng basketId
    queryFn: () => getBasketById(basketId) // Chỉnh sửa API cho đúng
  })

  const basket = data?.data.result

  // Kiểm tra trạng thái loading hoặc error
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading product details!</div>

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='text-center mb-8'>
        <h1 className='text-3xl font-bold'>{basket?.name}</h1>
        <p className='mt-2 text-sm text-gray-500'>{basket?.description}</p>
        <p className='mt-4 text-lg text-red-500 font-bold'>{basket?.price} đ</p>
      </div>

      {/* Hiển thị hình ảnh sản phẩm */}
      <div className='flex justify-center mb-8'>
        {basket?.images &&
          basket.images.map((image: any, index: any) => (
            <img key={index} className='w-full h-auto max-w-sm' src={image.imageUrl} alt={basket?.name} />
          ))}
      </div>

      {/* Chi tiết sản phẩm */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <h3 className='text-xl font-semibold'>Thông tin chi tiết</h3>
          <ul className='mt-4 text-sm text-gray-700'>
            <li>
              <strong>Loại sản phẩm:</strong> {basket?.category}
            </li>
            <li>
              <strong>Trọng lượng:</strong> {basket?.weight} kg
            </li>
            <li>
              <strong>Đơn vị tính:</strong> {basket?.unit}
            </li>
            {/* Thêm các thông tin khác nếu có */}
          </ul>
        </div>

        <div>
          <h3 className='text-xl font-semibold'>Mua ngay</h3>
          <div className='mt-4'>
            <button className='bg-red-500 text-white px-6 py-2 rounded-full w-full'>Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProduct
