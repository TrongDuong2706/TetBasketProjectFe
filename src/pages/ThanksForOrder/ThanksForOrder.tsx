import React from 'react'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/HomeHeader/Header'

export default function ThanksForOrder() {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <Header />

      <div className='max-w-4xl mx-auto bg-white p-8 mt-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-bold text-green-600 text-center mb-6'>Cảm ơn bạn đã đặt hàng!</h1>
        <p className='text-lg text-gray-700 text-center mb-6'>
          Chúng tôi đã nhận được đơn hàng của bạn. Vui lòng kiểm tra email để xem chi tiết đơn hàng.
        </p>

        <div className='text-center'>
          <p className='text-gray-600'>Chúc bạn một ngày tuyệt vời!</p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
