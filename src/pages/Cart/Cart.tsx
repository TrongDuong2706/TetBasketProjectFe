import React from 'react'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/HomeHeader/Header'

export default function Cart() {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-grow container mx-auto p-4'>
                <div className='flex flex-col lg:flex-row mx-2'>
                    <div className='lg:w-1/2 lg:shadow-lg p-4 lg:border'>
                        <h2 className='text-2xl font-bold mb-5 text-center'>Giỏ hàng của bạn</h2>
                        <ul>
                            <li className='flex items-center mb-4 border-b pb-4'>
                                <img src='/images/slide.jpeg' alt='Product 1' className='w-24 h-24 object-cover' />
                                <div className='ml-4 flex-grow'>
                                    <h3 className='text-lg font-semibold'>Sản phẩm 1</h3>
                                    <p className='text-gray-700 mt-2'>Giá: 1,000,000đ</p>
                                </div>
                                <input type='number' defaultValue='1' className='border p-1 w-16 text-center' />
                            </li>
                            <li className='flex items-center mb-4 border-b pb-4'>
                                <img src='/images/slide.jpeg' alt='Product 2' className='w-24 h-24 object-cover' />
                                <div className='ml-4 flex-grow'>
                                    <h3 className='text-lg font-semibold'>Sản phẩm 2</h3>
                                    <p className='text-gray-700 mt-2'>Giá: 1,200,000đ</p>
                                </div>
                                <input type='number' defaultValue='1' className='border p-1 w-16 text-center' />
                            </li>
                        </ul>
                    </div>
                    <div className='lg:w-1/2 lg:ml-8 mt-8 lg:mt-0 lg:border lg:pl-8 lg:shadow-lg p-4'>
                        <h2 className='text-2xl font-bold mb-5 text-center'>Thông tin thanh toán</h2>
                        <form className='space-y-4'>
                            <label className='block'>
                                Họ và tên:
                                <input type='text' name='name' className='border p-2 w-full mt-2' required />
                            </label>
                            <label className='block'>
                                Số điện thoại:
                                <input type='text' name='phone' className='border p-2 w-full mt-1' required />
                            </label>
                            <label className='block'>
                                Địa chỉ email:
                                <input type='email' name='email' className='border p-2 w-full mt-1' required />
                            </label>
                            <label className='block'>
                                Tỉnh/Thành phố:
                                <select name='city' className='border p-2 w-full mt-1' required>
                                    <option value=''>Chọn Tỉnh/Thành phố</option>
                                    <option value='Hồ Chí Minh'>Hồ Chí Minh</option>
                                    <option value='Hà Nội'>Hà Nội</option>
                                </select>
                            </label>
                            <label className='block'>
                                Quận/Huyện:
                                <select name='district' className='border p-2 w-full mt-1' required>
                                    <option value=''>Chọn Quận/Huyện</option>
                                </select>
                            </label>
                            <label className='block'>
                                Xã/Phường/Thị trấn:
                                <select name='ward' className='border p-2 w-full mt-1' required>
                                    <option value=''>Chọn Xã/Phường/Thị trấn</option>
                                </select>
                            </label>
                            <label className='block'>
                                Địa chỉ:
                                <input type='text' name='address' className='border p-2 w-full mt-1' required />
                            </label>
                            <div className='flex items-center'>
                                <input type='radio' name='vat' value='no' className='mr-2 mt-1' defaultChecked />
                                KHÔNG xuất hoá đơn VAT
                                <input type='radio' name='vat' value='yes' className='ml-4 mr-2 mt-1' />
                                Có xuất hoá đơn VAT
                            </div>
                            <div className='flex items-center'>
                                <input type='checkbox' name='differentAddress' className='mr-2 mt-1' />
                                GIAO HÀNG TỚI ĐỊA CHỈ KHÁC?
                            </div>
                            <label className='block'>
                                Ghi chú đơn hàng:
                                <textarea name='note' className='border p-2 w-full mt-1'></textarea>
                            </label>
                            <button type='submit' className='bg-red-500 text-white p-2 rounded w-full'>Đặt hàng</button>
                        </form>
                        <div className='mt-4'>
                            <h3 className='text-lg font-semibold'>Tổng cộng: 2,200,000đ</h3>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
