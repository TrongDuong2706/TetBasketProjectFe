import React from 'react'
import ProductDetailInformation from '../ProductDetailInformation/ProductDetailInformation'
import { Card, CardContent } from '../ui/card'
import { Package, Truck } from 'lucide-react'

export default function ProductDetailInformation2() {
  return (
    <Card className='bg-[#fdf7ec] mt-4 border border-gray-300 p-4 rounded-lg text-gray-700 text-sm'>
      <CardContent>
        <div className='space-y-4'>
          {/* In ấn logo thương hiệu */}
          <div className='flex items-start space-x-2'>
            <Package className='text-yellow-600' size={20} />
            <div>
              <p className='font-semibold'>In ấn logo thương hiệu</p>
              <p>
                In ấn, gia công logo theo thương hiệu riêng của khách hàng trên hộp quà với số lượng từ 10 phần trở lên
                <span className='text-red-500 font-semibold'> Theo bảng giá</span>
              </p>
            </div>
          </div>

          {/* Hỗ trợ giao hàng từng điểm */}
          <div className='flex items-start space-x-2'>
            <Truck className='text-yellow-600' size={20} />
            <div>
              <p className='font-semibold'>Hỗ trợ giao hàng từng điểm</p>
              <p>
                Với những đơn hàng đặt số lượng và giao nhiều nơi, Happybox có dịch vụ giao hàng từng địa điểm / tận tay
                khách hàng trên toàn quốc (Có tính phí)
              </p>
              <p>
                (Vui lòng liên hệ
                <span className='text-red-500 font-semibold'> 0906 330 360</span> để biết thêm chi tiết về gói dịch vụ)
              </p>
            </div>
          </div>

          {/* Chính sách giao hàng */}
          <ProductDetailInformation />
        </div>
      </CardContent>
    </Card>
  )
}
