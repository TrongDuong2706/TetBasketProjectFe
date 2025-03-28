import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getAllBasketByOrderId, getOneOrder } from 'src/apis/order.api'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/HomeHeader/Header'

export default function OrderDetail() {
  const { orderId } = useParams() // Lấy orderId từ URL

  // Lấy dữ liệu giỏ hàng của đơn hàng bằng orderId
  const {
    data: basketData,
    isLoading: basketLoading,
    isError: basketError
  } = useQuery({
    queryKey: ['GetOrderDetail', orderId],
    queryFn: () => getAllBasketByOrderId(orderId) // Truyền orderId vào API
  })

  // Lấy thông tin chi tiết đơn hàng
  const {
    data: orderData,
    isLoading: orderLoading,
    isError: orderError
  } = useQuery({
    queryKey: ['oneOrderDetail', orderId],
    queryFn: () => getOneOrder(orderId)
  })
  const order = orderData?.data.result

  // Hiển thị khi đang tải dữ liệu hoặc khi có lỗi
  if (basketLoading || orderLoading) {
    return <div>Đang tải dữ liệu...</div>
  }

  if (basketError || orderError) {
    return <div>Đã có lỗi xảy ra!</div>
  }

  return (
    <div>
      <Header />

      <div className='container mx-auto p-4 max-w-3xl'>
        <h1 className='text-xl font-bold text-gray-800 mb-4'>Chi tiết đơn hàng #{orderId}</h1>

        <div className='space-y-6'>
          {/* Hiển thị thông tin đơn hàng */}
          <div className='bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-lg font-semibold text-gray-800'>Thông tin đơn hàng</h2>
            <div className='flex flex-col space-y-2'>
              <p>
                <strong>Ngày đặt hàng:</strong> {new Date(order?.orderDate).toLocaleDateString('vi-VN')}
              </p>
              <p>
                <strong>Tổng tiền:</strong> {order?.totalAmount} VNĐ
              </p>
              <p>
                <strong>Giảm giá:</strong> {order?.discountAmount} VNĐ
              </p>
              <p>
                <strong>Phí vận chuyển:</strong> {order?.shippingFee} VNĐ
              </p>
              <p>
                <strong>Tình trạng đơn hàng:</strong> {order?.orderStatus}
              </p>
            </div>
          </div>

          {/* Hiển thị các sản phẩm trong giỏ hàng */}
          <div className='bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-lg font-semibold text-gray-800'>Các sản phẩm trong đơn hàng</h2>
            {basketData?.data.result.map((item) => (
              <div key={item.basketId} className='flex items-center gap-4 border-b py-3'>
                <img
                  src={item.images[0]?.imageUrl || 'https://via.placeholder.com/100'}
                  className='w-20 h-20 object-cover rounded'
                />
                <div className='flex-1'>
                  <h3 className='text-base font-semibold text-gray-800'>{item.name}</h3>
                  <p className='text-sm text-gray-600'>Giá: {item.price} VNĐ</p>
                  <p className='text-sm text-gray-600'>Số lượng: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
