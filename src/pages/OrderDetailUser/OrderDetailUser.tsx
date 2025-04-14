import { useQuery, useMutation } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { cancelOrder, getAllBasketByOrderId, getOneOrder } from 'src/apis/order.api'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/HomeHeader/Header'

export default function OrderDetail() {
  const { orderId } = useParams()

  // Fetch order details
  const {
    data: orderData,
    isLoading: orderLoading,
    isError: orderError
  } = useQuery({
    queryKey: ['oneOrderDetail', orderId],
    queryFn: () => getOneOrder(orderId)
  })
  const order = orderData?.data.result

  // Fetch basket data
  const {
    data: basketData,
    isLoading: basketLoading,
    isError: basketError
  } = useQuery({
    queryKey: ['GetOrderDetail', orderId],
    queryFn: () => getAllBasketByOrderId(orderId)
  })

  // Mutation for order cancellation
  const deleteMutation = useMutation({
    mutationFn: () => cancelOrder(orderId),
    onSuccess: () => {
      toast.success('Hủy đơn hàng thành công')
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message || 'Lỗi khi hủy đơn hàng'
      toast.error(errorMessage)
    }
  })

  // Handle cancel order
  const handleCancel = () => {
    window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')
    deleteMutation.mutate()
  }

  // Loading or error state
  if (basketLoading || orderLoading) return <div className='text-center text-gray-600 mt-10'>Đang tải dữ liệu...</div>
  if (basketError || orderError) return <div className='text-center text-red-500 mt-10'>Đã có lỗi xảy ra!</div>

  return (
    <div>
      <Header />

      <div className='container mx-auto p-4 max-w-4xl'>
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>Chi tiết đơn hàng</h1>

        {/* Order Information */}
        <div className='bg-white shadow-md rounded-lg p-6 mb-6'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>Thông tin đơn hàng</h2>
          <div className='grid grid-cols-2 gap-4 text-gray-700'>
            <p>
              <strong>Tổng tiền:</strong> {order?.totalAmount.toLocaleString('vi-VN')} VNĐ
            </p>
            <p>
              <strong>Voucher Code:</strong> {order?.voucherCode || 'Không có'}
            </p>

            <p>
              <strong>Ngày đặt:</strong> {new Date(order?.orderDate).toLocaleDateString('vi-VN')}
            </p>
            <p>
              <strong>Ghi chú:</strong> {order?.note || 'Không có ghi chú'}
            </p>
            <p>
              <strong>Trạng thái:</strong>
              <p
                className={`font-bold ${
                  order?.orderStatus === 'PENDING'
                    ? 'text-yellow-500'
                    : order?.orderStatus === 'CONFIRMED'
                      ? 'text-blue-500'
                      : order?.orderStatus === 'SHIPPED'
                        ? 'text-orange-500'
                        : order?.orderStatus === 'DELIVERED'
                          ? 'text-green-500'
                          : order?.orderStatus === 'CANCELED'
                            ? 'text-red-500'
                            : 'text-gray-500'
                }`}
              >
                {order?.orderStatus === 'PENDING'
                  ? 'Đang chờ xác nhận đơn hàng'
                  : order?.orderStatus === 'CONFIRMED'
                    ? 'Đơn hàng của bạn đã được xác nhận.'
                    : order?.orderStatus === 'SHIPPED'
                      ? 'Đơn hàng của bạn đã được gửi đi.'
                      : order?.orderStatus === 'DELIVERED'
                        ? 'Đơn hàng của bạn đã được giao thành công.'
                        : order?.orderStatus === 'CANCELED'
                          ? 'Đơn hàng đã bị hủy.'
                          : 'Trạng thái không xác định'}
              </p>
            </p>
          </div>
        </div>

        {/* Customer Information */}
        <div className='bg-white shadow-md rounded-lg p-6 mb-6'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>Thông tin người nhận</h2>
          <div className='grid grid-cols-2 gap-4 text-gray-700'>
            <p>
              <strong>Họ và tên:</strong> {order?.fullName}
            </p>
            <p>
              <strong>Email:</strong> {order?.email}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {order?.phoneNumber}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {order?.address}
            </p>
          </div>
        </div>

        {/* Basket Items */}
        <div className='bg-white shadow-md rounded-lg p-6'>
          <h2 className='text-lg font-semibold text-gray-800 mb-4'>Danh sách sản phẩm</h2>
          {basketData?.data.result.length > 0 ? (
            basketData?.data.result.map((item) => (
              <div key={item.basketId} className='flex items-center gap-4 border-b py-3'>
                <img
                  src={item.images[0]?.imageUrl || 'https://via.placeholder.com/100'}
                  className='w-20 h-20 object-cover rounded'
                  alt={item.name}
                />
                <div className='flex-1'>
                  <h3 className='text-base font-semibold text-gray-800'>{item.name}</h3>
                  <p className='text-sm text-gray-600'>Giá: {item.price.toLocaleString('vi-VN')} VNĐ</p>
                  <p className='text-sm text-gray-600'>Số lượng: {item.quantity}</p>
                </div>
              </div>
            ))
          ) : (
            <p className='text-gray-600'>Không có sản phẩm nào trong đơn hàng.</p>
          )}
        </div>

        {/* Cancel Order Button */}

        <button
          onClick={handleCancel}
          disabled={deleteMutation.isPending}
          className='w-full mt-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 disabled:bg-gray-300'
        >
          {deleteMutation.isPending ? 'Đang hủy...' : 'Hủy đơn hàng'}
        </button>
      </div>

      <Footer />
    </div>
  )
}
