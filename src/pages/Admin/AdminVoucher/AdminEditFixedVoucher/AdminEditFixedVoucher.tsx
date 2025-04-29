import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getOneVoucher, updateVoucher } from 'src/apis/voucher.api'

export default function AdminEditFixedVoucher() {
  const { voucherId } = useParams()
  const navigate = useNavigate()
  const id = voucherId ? parseInt(voucherId, 10) : undefined

  const { data: voucherData, isLoading } = useQuery({
    queryKey: ['voucher', id],
    queryFn: () => getOneVoucher(id),
    enabled: !!id
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      voucherCode: '',
      discountPercentage: 0,
      fixedDiscount: 0,
      expiryDate: '',
      quantity: 0,
      status: 'ACTIVE',
      minPurchaseAmount: 0
    }
  })

  useEffect(() => {
    if (voucherData) {
      const v = voucherData.data.result
      setValue('name', v.name || '')
      setValue('voucherCode', v.voucherCode || '')
      setValue('discountPercentage', v.discountPercentage || 0)
      setValue('fixedDiscount', v.fixedDiscount || 0)
      setValue('expiryDate', v.expiryDate?.slice(0, 10) || '')
      setValue('quantity', v.quantity || 0)
      setValue('status', v.status || 'ACTIVE')
      setValue('minPurchaseAmount', v.minPurchaseAmount || 0)
    }
  }, [voucherData, setValue])

  const mutation = useMutation({
    mutationFn: (data: any) =>
      updateVoucher(
        id as number,
        data.voucherCode,
        data.name,
        Number(data.discountPercentage),
        Number(data.fixedDiscount),
        new Date(data.expiryDate),
        data.status,
        Number(data.minPurchaseAmount),
        Number(data.quantity)
      ),
    onSuccess: () => {
      toast.success('Cập nhật voucher thành công!')
      navigate('/admin/voucher-list')
    },
    onError: () => {
      toast.error('Có lỗi xảy ra, vui lòng thử lại.')
    }
  })

  const onSubmit = (data: any) => {
    mutation.mutate(data)
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-2xl font-semibold text-gray-800 mb-6'>Chỉnh sửa Voucher</h1>

      <div className='bg-white p-6 shadow-md rounded-md'>
        <form className='grid grid-cols-1 gap-6' onSubmit={handleSubmit(onSubmit)}>
          {/* Tên Voucher */}
          <div className='flex flex-col'>
            <label className='text-gray-700'>Tên Voucher</label>
            <input
              type='text'
              className='p-2 border rounded-md'
              {...register('name', { required: 'Tên voucher là bắt buộc' })}
            />
            {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
          </div>

          {/* Mã Voucher */}
          <div className='flex flex-col'>
            <label className='text-gray-700'>Mã Voucher</label>
            <input
              type='text'
              className='p-2 border rounded-md'
              {...register('voucherCode', { required: 'Mã voucher là bắt buộc' })}
            />
            {errors.voucherCode && <p className='text-red-500 text-sm'>{errors.voucherCode.message}</p>}
          </div>

          {/* Giảm giá cố định (VND) */}
          <div className='flex flex-col'>
            <label className='text-gray-700'>Giảm giá cố định (VND)</label>
            <input
              type='number'
              className='p-2 border rounded-md'
              {...register('fixedDiscount', {
                required: 'Giá trị giảm giá cố định là bắt buộc',
                min: { value: 1, message: 'Giá trị giảm giá phải lớn hơn 0' }
              })}
            />
            {errors.fixedDiscount && <p className='text-red-500 text-sm'>{errors.fixedDiscount.message}</p>}
          </div>

          {/* Giá trị đơn hàng tối thiểu */}
          <div className='flex flex-col'>
            <label className='text-gray-700'>Giá trị đơn hàng tối thiểu</label>
            <input
              type='number'
              className='p-2 border rounded-md'
              {...register('minPurchaseAmount', {
                required: 'Giá trị đơn hàng tối thiểu là bắt buộc',
                min: { value: 0, message: 'Không được nhỏ hơn 0' }
              })}
            />
            {errors.minPurchaseAmount && <p className='text-red-500 text-sm'>{errors.minPurchaseAmount.message}</p>}
          </div>

          {/* Ngày hết hạn */}
          <div className='flex flex-col'>
            <label className='text-gray-700'>Ngày hết hạn</label>
            <input
              type='date'
              className='p-2 border rounded-md'
              {...register('expiryDate', { required: 'Ngày hết hạn là bắt buộc' })}
            />
            {errors.expiryDate && <p className='text-red-500 text-sm'>{errors.expiryDate.message}</p>}
          </div>

          {/* Số lượng */}
          <div className='flex flex-col'>
            <label className='text-gray-700'>Số lượng</label>
            <input
              type='number'
              className='p-2 border rounded-md'
              {...register('quantity', {
                required: 'Số lượng là bắt buộc',
                min: { value: 1, message: 'Số lượng phải lớn hơn 0' }
              })}
            />
            {errors.quantity && <p className='text-red-500 text-sm'>{errors.quantity.message}</p>}
          </div>

          {/* Trạng thái */}
          <div className='flex flex-col'>
            <label className='text-gray-700'>Trạng thái</label>
            <select className='p-2 border rounded-md' {...register('status', { required: 'Trạng thái là bắt buộc' })}>
              <option value='ACTIVE'>Kích hoạt</option>
              <option value='INACTIVE'>Tạm ngưng</option>
            </select>
            {errors.status && <p className='text-red-500 text-sm'>{errors.status.message}</p>}
          </div>

          {/* Buttons */}
          <div className='flex justify-between'>
            <Link to='/admin/voucher-list'>
              <button className='bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition'>
                Quay lại
              </button>
            </Link>
            <button
              type='submit'
              className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition'
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Đang lưu...' : 'Lưu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
