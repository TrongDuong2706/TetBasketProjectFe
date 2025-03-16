import React from 'react'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/HomeHeader/Header'

export default function Cart() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex justify-center items-center bg-gray-200 bg-cover bg-center p-6'>
        <div className='bg-white shadow-lg rounded-lg w-full max-w-5xl p-6'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Giỏ hàng</h2>

          {/* Cart Table */}
          <table className='w-full border-collapse border border-gray-300'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border p-2'>STT</th>
                <th className='border p-2'>Ảnh đại diện</th>
                <th className='border p-2'>Tên sản phẩm</th>
                <th className='border p-2'>Số lượng</th>
                <th className='border p-2'>Đơn giá</th>
                <th className='border p-2'>Thành tiền</th>
                <th className='border p-2'>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {/* Product 1 */}
              <tr className='text-center'>
                <td className='border p-2'>1</td>
                <td className='border p-2'>
                  <img
                    src='https://storage.googleapis.com/a1aa/image/nuHv3KgPvRba4fNSDvPdwgWqJB-rBFwNlGmxz_IcXxw.jpg'
                    alt='S1'
                    className='w-32 h-32 object-cover mx-auto'
                  />
                </td>
                <td className='border p-2'>Hộp quà Tết cao cấp Happybox Phúc Lộc An Khang HPH111</td>
                <td className='border p-2'>
                  <input type='number' defaultValue='2' className='border w-12 text-center' />
                </td>
                <td className='border p-2'>1,190,000</td>
                <td className='border p-2'>2,380,000</td>
                <td className='border p-2'>
                  <button className='bg-red-500 text-white px-3 py-1 rounded'>🗑 Xóa</button>
                </td>
              </tr>

              {/* Product 2 */}
              <tr className='text-center'>
                <td className='border p-2'>2</td>
                <td className='border p-2'>
                  <img
                    src='https://storage.googleapis.com/a1aa/image/PFk-gzjydnOoCqmJOrHCf3vEQD4X0R_E5pQJMgqKR5I.jpg'
                    alt='S2'
                    className='w-32 h-32 object-cover mx-auto'
                  />
                </td>
                <td className='border p-2'>Hộp Quà Tết cao cấp Happybox HPH1218</td>
                <td className='border p-2'>
                  <input type='number' defaultValue='5' className='border w-12 text-center' />
                </td>
                <td className='border p-2'>680,000</td>
                <td className='border p-2'>3,400,000</td>
                <td className='border p-2'>
                  <button className='bg-red-500 text-white px-3 py-1 rounded'>🗑 Xóa</button>
                </td>
              </tr>

              {/* Product 3 */}
              <tr className='text-center'>
                <td className='border p-2'>2</td>
                <td className='border p-2'>
                  <img
                    src='https://storage.googleapis.com/a1aa/image/PFk-gzjydnOoCqmJOrHCf3vEQD4X0R_E5pQJMgqKR5I.jpg'
                    alt='S2'
                    className='w-32 h-32 object-cover mx-auto'
                  />
                </td>
                <td className='border p-2'>Hộp Quà Tết cao cấp Happybox HPH1218</td>
                <td className='border p-2'>
                  <input type='number' defaultValue='5' className='border w-12 text-center' />
                </td>
                <td className='border p-2'>680,000</td>
                <td className='border p-2'>3,400,000</td>
                <td className='border p-2'>
                  <button className='bg-red-500 text-white px-3 py-1 rounded'>🗑 Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Footer Actions */}
          <div className='mt-6 flex justify-between'>
            <a href='#' className='text-blue-500'>
              ← Quay lại trang sản phẩm
            </a>
            <button className='bg-blue-500 text-white px-4 py-2 rounded'>Đặt Hàng</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
