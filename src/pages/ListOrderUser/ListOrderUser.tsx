import { useQueries, useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllBasketByOrderId, getAllOrderByUserId } from 'src/apis/order.api'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/HomeHeader/Header'
import { getUserId } from 'src/utils/auth'
import { Link, useSearchParams } from 'react-router-dom'

export default function ListOrderUser() {
  const size = 4 // Số đơn hàng mỗi trang
  const userId = getUserId()

  // Lấy và cập nhật searchParams từ URL
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 0

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() })
  }

  // Fetch orders by userId
  const { data, isLoading, error } = useQuery({
    queryKey: ['orders', userId, page],
    queryFn: () => getAllOrderByUserId(page, size, userId)
  })

  const orders = data?.data.result.elements || []
  const hasNextPage = data?.data.result.hasNextPage
  const hasPreviousPage = data?.data.result.hasPreviousPage
  const totalPages = data?.data.result.totalPages || 1

  // Fetch basket for each order
  const basketQueries = useQueries({
    queries: orders.map((order) => ({
      queryKey: ['basket', order.orderId],
      queryFn: () => getAllBasketByOrderId(order.orderId),
      enabled: !!order.orderId
    }))
  })

  // Loading and error handling
  if (isLoading) return <div className='text-center mt-10'>Đang tải đơn hàng...</div>
  if (error) return <div className='text-center mt-10 text-red-500'>Lỗi khi tải đơn hàng</div>
  if (orders.length === 0) {
    return (
      <div>
        <Header />
        <div className='container mx-auto p-4 max-w-3xl'>
          <h1 className='text-xl font-bold text-gray-800 mb-4'>Đơn hàng của tôi</h1>
          <div className='text-center mt-10'>
            <p className='text-gray-600'>Bạn chưa có đơn hàng nào.</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

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
                key={order.orderId}
                to={`/order-detail/${order.orderId}`}
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
                      <p className='text-sm text-gray-600'>Tổng Tiền: {order.finalAmount.toLocaleString('vi-VN')}đ</p>
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
                    <p
                      className={`font-bold ${
                        order.orderStatus === 'PENDING'
                          ? 'text-yellow-500'
                          : order.orderStatus === 'CONFIRMED'
                            ? 'text-blue-500'
                            : order.orderStatus === 'SHIPPED'
                              ? 'text-orange-500'
                              : order.orderStatus === 'DELIVERED'
                                ? 'text-green-500'
                                : order.orderStatus === 'CANCELED'
                                  ? 'text-red-500'
                                  : 'text-gray-500'
                      }`}
                    >
                      {order.orderStatus === 'PENDING'
                        ? 'Đang chờ xác nhận đơn hàng'
                        : order.orderStatus === 'CONFIRMED'
                          ? 'Đơn hàng của bạn đã được xác nhận.'
                          : order.orderStatus === 'SHIPPED'
                            ? 'Đơn hàng của bạn đã được gửi đi.'
                            : order.orderStatus === 'DELIVERED'
                              ? 'Đơn hàng của bạn đã được giao thành công.'
                              : order.orderStatus === 'CANCELED'
                                ? 'Đơn hàng đã bị hủy.'
                                : 'Trạng thái không xác định'}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* PHÂN TRANG */}
        <div className='flex justify-center items-center mt-6 space-x-2'>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={!hasPreviousPage}
            className={`px-3 py-2 rounded-lg font-medium ${
              hasPreviousPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            &laquo;
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={`px-4 py-2 rounded-lg font-medium ${
                index === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={!hasNextPage}
            className={`px-3 py-2 rounded-lg font-medium ${
              hasNextPage ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            &raquo;
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
