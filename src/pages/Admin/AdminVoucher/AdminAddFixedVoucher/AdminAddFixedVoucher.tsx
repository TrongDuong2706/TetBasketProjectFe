import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createVoucher } from 'src/apis/voucher.api'

export default function AdminAddFixedVoucher() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{
    name: string
    voucher_code: string
    discount_percentage: number
    fixedDiscount: number
    expiry_date: string
    min_purchase_amount: number
    quantity: number
    status: string
  }>()

  // Gọi mutation để tạo voucher
  const { mutate, isPending } = useMutation({
    mutationFn: (data: {
      voucherCode: string
      name: string
      discountPercentage: number
      fixedDiscount: number
      expiryDate: Date
      status: string
      minPurchaseAmount: number
      quantity: number
    }) => createVoucher(data),
    onSuccess: () => {
      toast.success('🎉 Tạo voucher thành công!')
      navigate('/admin/voucher') // Điều hướng về trang danh sách voucher
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Đã xảy ra lỗi khi tạo voucher.'
      toast.error(`❌ ${errorMessage}`)
    }
  })

  // Xử lý submit form
  const onSubmit = (data: any) => {
    mutate({
      voucherCode: data.voucher_code,
      name: data.name,
      discountPercentage: Number(data.discount_percentage),
      fixedDiscount: Number(data.fixedDiscount),
      expiryDate: new Date(data.expiry_date),
      status: data.status,
      minPurchaseAmount: Number(data.min_purchase_amount),
      quantity: Number(data.quantity)
    })
  }

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-semibold text-gray-800'>Thêm Voucher</h1>
      </div>

      <div className='bg-white shadow-lg rounded-lg p-6'>
        <form className='space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4' onSubmit={handleSubmit(onSubmit)}>
          {/* Tên Voucher */}
          <div>
            <label className='block text-gray-700' htmlFor='name'>
              Tên Voucher <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='name'
              {...register('name', { required: 'Tên Voucher là bắt buộc' })}
              className='mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Nhập tên Voucher'
            />
            {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
          </div>

          {/* Mã Voucher */}
          <div>
            <label className='block text-gray-700' htmlFor='voucher_code'>
              Mã Voucher <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='voucher_code'
              {...register('voucher_code', { required: 'Mã Voucher là bắt buộc' })}
              className='mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Nhập mã Voucher'
            />
            {errors.voucher_code && <p className='text-red-500 text-sm'>{errors.voucher_code.message}</p>}
          </div>

          {/* Giảm Giá (%) */}
          <div>
            <label className='block text-gray-700' htmlFor='fixedDiscount'>
              Giảm Giá Cố Định <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              id='fixedDiscount'
              {...register('fixedDiscount', { required: 'Giảm giá cố định là bắt buộc' })}
              className='mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Nhập giá giảm cố định'
            />
            {errors.fixedDiscount && <p className='text-red-500 text-sm'>{errors.fixedDiscount.message}</p>}
          </div>

          {/* Ngày Hết Hạn */}
          <div>
            <label className='block text-gray-700' htmlFor='expiry_date'>
              Ngày Hết Hạn <span className='text-red-500'>*</span>
            </label>
            <input
              type='datetime-local'
              id='expiry_date'
              {...register('expiry_date', { required: 'Ngày hết hạn là bắt buộc' })}
              className='mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.expiry_date && <p className='text-red-500 text-sm'>{errors.expiry_date.message}</p>}
          </div>

          {/* Số Lượng */}
          <div>
            <label className='block text-gray-700' htmlFor='quantity'>
              Số Lượng <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              id='quantity'
              {...register('quantity', { required: 'Số lượng là bắt buộc' })}
              className='mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Nhập số lượng voucher'
            />
            {errors.quantity && <p className='text-red-500 text-sm'>{errors.quantity.message}</p>}
          </div>

          {/* Trạng Thái */}
          <div>
            <label className='block text-gray-700' htmlFor='status'>
              Trạng Thái <span className='text-red-500'>*</span>
            </label>
            <select
              id='status'
              {...register('status', { required: 'Trạng thái là bắt buộc' })}
              className='mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value='ACTIVE'>ACTIVE</option>
              <option value='INACTIVE'>INACTIVE</option>
            </select>
            {errors.status && <p className='text-red-500 text-sm'>{errors.status.message}</p>}
          </div>

          {/* Điều kiện áp dụng */}
          <div>
            <label className='block text-gray-700' htmlFor='min_purchase_amount'>
              Điều Kiện Áp Dụng (VNĐ) <span className='text-red-500'>*</span>
            </label>
            <input
              type='number'
              id='min_purchase_amount'
              {...register('min_purchase_amount', { required: 'Điều kiện áp dụng là bắt buộc' })}
              className='mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Nhập điều kiện tối thiểu để áp dụng'
            />
            {errors.min_purchase_amount && <p className='text-red-500 text-sm'>{errors.min_purchase_amount.message}</p>}
          </div>

          {/* Nút lưu */}
          <div className='flex justify-end col-span-2'>
            <button
              type='submit'
              className='px-6 py-2 rounded-md transition text-white bg-blue-500 hover:bg-blue-600'
              disabled={isPending}
            >
              {isPending ? 'Đang tạo...' : 'Tạo Voucher'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
