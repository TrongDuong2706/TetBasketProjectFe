import React, { useState } from 'react'
import Header from 'src/components/HomeHeader/Header'
import Footer from 'src/components/Footer/Footer'
import { FaPhoneAlt } from 'react-icons/fa'
import { useMutation } from '@tanstack/react-query'
import { getUserId } from 'src/utils/auth'
import { useQuery } from '@tanstack/react-query'
import { getAllItemInCart } from 'src/apis/cart.api'
import { createOrder } from 'src/apis/order.api' // Giả sử đường dẫn này đúng
import { toast } from 'react-toastify'
interface FormData {
  fullName: string
  email: string
  phoneNumber: string
  address: string
  note: string
  voucherCode: string
}
const PlaceOrder: React.FC = () => {
  const userId = getUserId()

  // State để lưu thông tin form
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    note: '',
    voucherCode: ''
  })

  // Call API lấy giỏ hàng
  const { data, isLoading, error } = useQuery({
    queryKey: ['cartItems', userId],
    queryFn: () => getAllItemInCart(userId),
    enabled: !!userId
  })

  // Tính tổng tiền từ cartItems
  const cartItems = data?.data.result || []
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0) + 30000 // Cộng phí giao hàng

  // Mutation để tạo đơn hàng
  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast('Đặt hàng thành công')
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        address: '',
        note: '',
        voucherCode: ''
      })
    },
    onError: (error: Error) => {
      toast('Đặt hàng thất bại')
    }
  })

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle submit order
  const handleSubmitOrder = () => {
    const orderData = {
      userId,
      totalAmount,
      voucherCode: formData.voucherCode,
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      note: formData.note
    }

    createOrderMutation.mutate(orderData)
  }

  if (isLoading) return <div>Đang tải...</div>
  if (error) return <div>Có lỗi xảy ra: {error.message}</div>

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col'>
      <Header />
      <div className='flex-grow flex justify-center items-start p-4'>
        <div className='max-w-2xl bg-white p-6 rounded-lg shadow-md w-full'>
          <div className='border-t pt-4'>
            <h3 className='text-lg font-semibold mb-4'>Thông tin thanh toán</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block text-gray-700'>Họ và tên *</label>
                <input
                  className='w-full border rounded px-4 py-2'
                  placeholder='Nhập họ và tên'
                  type='text'
                  name='fullName'
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className='block text-gray-700'>Địa chỉ email *</label>
                <input
                  className='w-full border rounded px-4 py-2'
                  placeholder='Nhập địa chỉ email'
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className='block text-gray-700'>Số điện thoại *</label>
                <input
                  className='w-full border rounded px-4 py-2'
                  placeholder='Nhập số điện thoại'
                  type='text'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className='block text-gray-700'>Địa chỉ *</label>
                <input
                  className='w-full border rounded px-4 py-2'
                  placeholder='Nhập địa chỉ cụ thể'
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className='mb-4'>
              <label className='block text-gray-700'>Ghi chú đơn hàng (tuỳ chọn)</label>
              <textarea
                className='w-full border rounded px-4 py-2'
                placeholder='Ghi chú cho đơn hàng'
                rows={4}
                name='note'
                value={formData.note}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className='mb-4'>
              <label className='flex items-center text-gray-700'>
                <i className='fas fa-ticket-alt mr-2'></i>
                Sử dụng mã giảm giá
              </label>
              <div className='flex mt-2'>
                <input
                  className='flex-1 border rounded-l px-4 py-2'
                  placeholder='Mã ưu đãi'
                  type='text'
                  name='voucherCode'
                  value={formData.voucherCode}
                  onChange={handleInputChange}
                />
                <button className='bg-blue-500 text-white px-4 py-2 rounded-r'>Áp dụng</button>
              </div>
            </div>
          </div>
          <div className='border-t pt-4'>
            <div className='flex justify-between text-gray-700 mb-2'>
              <span>Tạm tính ({cartItems.length} sản phẩm):</span>
              <span>{cartItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()} đ</span>
            </div>
            <div className='flex justify-between text-gray-700 mb-2'>
              <span>Giao hàng:</span>
              <span>30,000 đ</span>
            </div>
            <div className='flex justify-between text-gray-700 font-semibold mb-4'>
              <span>Tổng:</span>
              <span>{totalAmount.toLocaleString()} đ</span>
            </div>
          </div>

          <div className='border-t pt-4 mb-4'>
            <h3 className='text-lg font-semibold mb-2'>Trả tiền mặt khi nhận hàng</h3>
            <p className='text-gray-700'>Nhận hàng và trả tiền mặt trực tiếp cho nhân viên giao hàng</p>
          </div>
          <button
            className='bg-[#b02c24] text-white text-center py-4 rounded-lg w-full'
            onClick={handleSubmitOrder}
            disabled={createOrderMutation.isPending}
          >
            {createOrderMutation.isPending ? 'Đang xử lý...' : 'Đặt hàng'}
          </button>
          <div className='mt-4 flex flex-col items-start space-y-1'></div>
        </div>
        <div className='max-w-2xl bg-white p-6 rounded-lg shadow-md w-full mt-4 md:mt-0 md:ml-4 flex flex-col justify-between'>
          {cartItems.map((product) => (
            <div key={product.id} className='flex items-center border-b pb-4 mb-4'>
              <img alt={product.name} className='w-24 h-24 object-cover rounded mr-4' src={product.imageUrls[0]} />
              <div className='flex-1 text-right'>
                <h2 className='text-lg font-semibold'>{product.name}</h2>
                <div className='text-gray-600'>{product.price.toLocaleString()} đ</div>
              </div>
              <div className='flex items-center'>
                <input className='w-12 text-center border rounded mx-2' type='text' value='1' readOnly />
              </div>
            </div>
          ))}
          <p className='text-gray-600'>Gặp khó khăn trong vấn đề đặt hàng?</p>
          <div className='flex items-center space-x-2'>
            <FaPhoneAlt className='text-[#b02c24] text-xl' />
            <p className='text-[#b02c24] text-2xl font-bold'>
              0918 330 360{' '}
              <span className='text-gray-600 text-base font-normal'>Gọi ngay để được hỗ trợ nhanh nhất!</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PlaceOrder
