import { useQueries, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getAllBasketByOrderId, getAllOrderByUserId } from 'src/apis/order.api'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/HomeHeader/Header'
import { getUserId } from 'src/utils/auth'
import { Link } from 'react-router-dom' // Thêm import Link từ react-router-dom

export default function ListOrderUser() {
  const [page, setPage] = useState(0) // Page bắt đầu từ 1
  const size = 5 // Định kích thước trang
  const userId = getUserId()

  // Fetch orders by userId
  const { data, isLoading, error } = useQuery({
    queryKey: ['orders', userId],
    queryFn: () => getAllOrderByUserId(page, size, userId)
  })

  const orders = data?.data.result.elements || []

  // Fetch basket for each order
  const basketQueries = useQueries({
    queries: orders.map((order) => ({
      queryKey: ['basket', order.orderId],
      queryFn: () => getAllBasketByOrderId(order.orderId),
      enabled: !!order.orderId
    }))
  })

  console.log('data:', data?.data.result.elements)

  // Loading and error handling
  if (isLoading) return <div className='text-center mt-10'>Đang tải đơn hàng...</div>
  if (error) return <div className='text-center mt-10 text-red-500'>Lỗi khi tải đơn hàng</div>

  return (
    <div>
      <Header />

      <div className='container mx-auto p-4 max-w-3xl'>
        <h1 className='text-xl font-bold text-gray-800 mb-4'>Đơn hàng của tôi</h1>

        <div className='space-y-4'>
          {orders.map((order, index) => {
            const basketData = basketQueries[index]?.data?.data?.result
            const firstItem = basketData?.[0]
            return (
              <Link
                key={index}
                to={`/order-detail/${order.orderId}`} // Sử dụng Link để điều hướng
                className='bg-white shadow-md rounded-lg p-4 flex flex-col gap-3 border cursor-pointer'
              >
                {firstItem && (
                  <div className='flex items-center gap-3 border-b pb-3'>
                    <img
                      src={firstItem.images[0]?.imageUrl || 'https://via.placeholder.com/100'}
                      className='w-20 h-20 object-cover rounded'
                      alt='product'
                    />
                    <div className='flex-1'>
                      <h3 className='text-base font-semibold text-gray-800'>{firstItem.name}</h3>
                      <p className='text-sm text-gray-600'>Tổng Tiền: {order.finalAmount}</p>
                    </div>
                  </div>
                )}

                <div className='flex justify-between text-sm'>
                  <div className='flex flex-col items-start'>
                    <p className='font-medium'>Ngày đặt hàng</p>
                    <p>{new Date(order.orderDate).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <div className='flex flex-col'>
                    <p className='font-medium text-gray-500'>Tình trạng đơn hàng</p>
                    <p className='text-green-500 font-bold'>{order.orderStatus}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      <Footer />
    </div>
  )
}
