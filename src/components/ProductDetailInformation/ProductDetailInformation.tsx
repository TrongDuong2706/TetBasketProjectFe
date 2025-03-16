import { Truck } from 'lucide-react'
import React from 'react'

export default function ProductDetailInformation() {
  return (
    <div className='flex items-start space-x-2'>
      <Truck className='text-yellow-600' size={20} />
      <div>
        <p className='font-semibold'>Chính sách giao hàng</p>
        <p className='font-medium'>Đơn dưới 5 phần</p>
        <ul className='list-disc list-inside'>
          <li>
            <span className='font-semibold'>Hỏa tốc</span>: Tp HCM, Hà Nội, Cần Thơ -{' '}
            <span className='font-semibold'>1-4h</span> (Theo App giao hàng)
          </li>
          <li>
            <span className='font-semibold'>Giao nhanh</span>: Tp HCM, Hà Nội, Cần Thơ -{' '}
            <span className='font-semibold'>1-2 ngày</span> (40,000đ)
          </li>
          <li>
            <span className='font-semibold'>Các tỉnh thành khác</span>: <span className='font-semibold'>3-5 ngày</span>{' '}
            (40,000đ)
          </li>
        </ul>
        <p className='text-green-600 font-semibold'>Miễn phí Giao nhanh cho những đơn hàng trên 1,000,000đ</p>
      </div>
    </div>
  )
}
