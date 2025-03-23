import { useQueries, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getAllBasketByOrderId, getAllOrderByUserId } from 'src/apis/order.api'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/HomeHeader/Header'
import { getUserId } from 'src/utils/auth'

export default function ListOrderUser() {
  const [page, setPage] = useState(0) // Page bắt đầu từ 1
  const size = 5 // Định kích thước trang
  const userId = getUserId()
  const { data, isLoading, error } = useQuery({
    queryKey: ['orders', userId],
    queryFn: () => getAllOrderByUserId(page, size, userId)
  })
  const orders = data?.data.result.elements || []

  const basketQueries = useQueries({
    queries: orders.map((order) => ({
      queryKey: ['basket', order.orderId],
      queryFn: () => getAllBasketByOrderId(order.orderId),
      enabled: !!order.orderId
    }))
  })

  if (isLoading) return <div className='text-center mt-10'>Đang tải đơn hàng...</div>
  if (error) return <div className='text-center mt-10 text-red-500'>Lỗi khi tải đơn hàng</div>
  return (
    <div>
      <Header />

      <div className='container mx-auto p-6'>
        <h1 className='text-2xl font-semibold text-gray-800 mb-6'>Danh sách đơn hàng của tôi</h1>

        {/* Card layout cho danh sách đơn hàng */}
        <div className='space-y-6'>
          {/* Đơn hàng 1 */}
          {orders?.map((order, index) => {
            const basketData = basketQueries[index]?.data?.data?.result
            const firstItem = basketData?.[0] // Lấy sản phẩm đầu tiên

            return (
              <div key={index} className='bg-white shadow-lg rounded-lg overflow-hidden p-6 flex flex-col gap-4'>
                {firstItem && (
                  <div className='flex items-center gap-4 border-b pb-4'>
                    <img
                      src={firstItem.images[0]?.imageUrl || 'https://via.placeholder.com/100'}
                      className='w-24 h-24 object-cover rounded-md'
                    />
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-gray-800'>{firstItem.name}</h3>
                      <p className='text-sm text-gray-600'>Tổng Tiền: {order.finalAmount}</p>
                    </div>
                  </div>
                )}

                {/* Trạng thái đơn hàng */}
                <div className='text-right'>
                  <p className='text-sm font-semibold text-green-500'>Giao hàng thành công</p>
                  <p className='text-sm text-gray-500'>{order.orderStatus}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Footer />
    </div>
  )
}
