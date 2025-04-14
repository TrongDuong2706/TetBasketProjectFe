import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { getOneVoucher, updateVoucher } from 'src/apis/voucher.api'

export default function AdminEditVoucher() {
  const { voucherId } = useParams()
  const navigate = useNavigate()
  const id = voucherId ? parseInt(voucherId, 10) : undefined

  const { data: voucherData, isLoading } = useQuery({
    queryKey: ['voucher', id],
    queryFn: () => getOneVoucher(id),
    enabled: !!id
  })

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: '',
      voucherCode: '',
      discountPercentage: 0,
      fixedDiscount: 0,
      expiryDate: '',
      quantity: 0,
      status: 'active',
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

  console.log(voucherData?.data.result)

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
          <div className='flex flex-col'>
            <label className='text-gray-700'>Tên Voucher</label>
            <input type='text' className='p-2 border rounded-md' {...register('name')} />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-700'>Mã Voucher</label>
            <input type='text' className='p-2 border rounded-md' {...register('voucherCode')} />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-700'>Phần trăm giảm giá (%)</label>
            <input type='number' className='p-2 border rounded-md' {...register('discountPercentage')} />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-700'>Giá trị đơn hàng tối thiểu</label>
            <input type='number' className='p-2 border rounded-md' {...register('minPurchaseAmount')} />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-700'>Ngày hết hạn</label>
            <input type='date' className='p-2 border rounded-md' {...register('expiryDate')} />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-700'>Số lượng</label>
            <input type='number' className='p-2 border rounded-md' {...register('quantity')} />
          </div>

          <div className='flex flex-col'>
            <label className='text-gray-700'>Trạng thái</label>
            <select className='p-2 border rounded-md' {...register('status')}>
              <option value='ACTIVE'>Kích hoạt</option>
              <option value='INACTIVE'>Tạm ngưng</option>
            </select>
          </div>

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
