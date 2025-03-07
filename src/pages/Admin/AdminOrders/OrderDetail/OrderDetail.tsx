import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getAllBasketByOrderId, getOneOrder } from 'src/apis/order.api'

export default function OrderDetail() {
  const { orderId } = useParams() // Lấy orderId từ URL

  // Lấy dữ liệu đơn hàng bằng orderId
  const { data, isLoading, isError } = useQuery({
    queryKey: ['GetOrderDetail', orderId], // Thêm orderId vào query key để thay đổi khi orderId thay đổi
    queryFn: () => getAllBasketByOrderId(orderId) // Truyền orderId vào API
  })

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
  if (isLoading) {
    return <div>Đang tải dữ liệu...</div>
  }

  if (isError) {
    return <div>Đã có lỗi xảy ra!</div>
  }

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='bg-white shadow-lg rounded-lg p-6 mb-6'>
        <h1 className='text-2xl font-semibold text-gray-800 mb-4'>Chi tiết đơn hàng</h1>

        {/* Thông tin đơn hàng */}
        <div className='mb-6'>
          <h2 className='text-lg font-semibold text-gray-700 mb-2'>Thông tin đơn hàng</h2>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <strong>ID đơn hàng:</strong> <span>{order?.orderId}</span> {/* Hiển thị orderId */}
            </div>
            <div>
              <strong>Ngày đặt hàng:</strong> <span>{order?.orderDate}</span>
            </div>
            <div>
              <strong>Họ tên:</strong> <span>{order?.fullName}</span>
            </div>
            <div>
              <strong>Địa chỉ giao hàng:</strong> <span>{order?.address}</span>
            </div>
            <div>
              <strong>Email:</strong> <span>{order?.email}</span>
            </div>
            <div>
              <strong>Số điện thoại:</strong> <span>{order?.phoneNumber}</span>
            </div>
            <div>
              <strong>Trạng thái đơn hàng:</strong> <span className='text-yellow-600'>{order?.orderStatus}</span>
            </div>
            <div>
              <strong>Mã giảm giá:</strong> <span>{order?.voucherCode}</span>
            </div>

            <div>
              <strong>Phí vận chuyển:</strong> <span>{order?.shippingFee}</span>
            </div>
            <div>
              <strong>Tổng tiền:</strong> <span>{order?.finalAmount}đ</span>
            </div>
          </div>
        </div>

        {/* Danh sách giỏ hàng */}
        <div>
          <h2 className='text-lg font-semibold text-gray-700 mb-2'>Danh sách sản phẩm trong đơn hàng</h2>
          <div className='bg-gray-100 rounded-lg'>
            <table className='w-full'>
              <thead className='bg-gray-700 text-white'>
                <tr>
                  <th className='py-3 px-4 text-left'>Mã sản phẩm</th>
                  <th className='py-3 px-4 text-left'>Tên sản phẩm</th>
                  <th className='py-3 px-4 text-left'>Số lượng</th>
                  <th className='py-3 px-4 text-left'>Giá</th>
                  <th className='py-3 px-4 text-left'>Tổng giá</th>
                  <th className='py-3 px-4 text-left'>Ảnh</th> {/* Cột ảnh */}
                </tr>
              </thead>
              <tbody className='text-gray-700'>
                {data?.data.result.map((item) => (
                  <tr key={item.id} className='border-b'>
                    <td className='py-3 px-4'>{item.basketId}</td>
                    <td className='py-3 px-4'>{item.name}</td>
                    <td className='py-3 px-4'>{item.quantity}</td>
                    <td className='py-3 px-4'>{item.price}₫</td>
                    <td className='py-3 px-4'>{item.price * item.quantity}₫</td>
                    <td className='py-3 px-4'>
                      {item.images.length > 0 ? (
                        <img src={item.images[0].imageUrl} className='w-16 h-16 object-cover' />
                      ) : (
                        <span>Không có ảnh</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
