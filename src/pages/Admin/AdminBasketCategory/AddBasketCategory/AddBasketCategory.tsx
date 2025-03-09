import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import { createBasketCategory } from 'src/apis/category.api'
import { toast } from 'react-toastify'

export default function AddBasketCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ name: string; description: string }>()
  const navigate = useNavigate()

  // Gọi mutation để tạo loại giỏ hàng
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { name: string; description: string }) => createBasketCategory(data.name, data.description),
    onSuccess: () => {
      toast.success('🎉 Tạo loại giỏ hàng thành công!')
      navigate('/admin/basket-category')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Đã xảy ra lỗi khi tạo loại giỏ hàng.'
      toast.error(`❌ ${errorMessage}`)
    }
  })

  // Xử lý submit form
  const onSubmit = (data: { name: string; description: string }) => {
    mutate(data)
  }

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-semibold text-gray-800'>Thêm loại giỏ hàng</h1>
      </div>

      <div className='bg-white shadow-lg rounded-lg p-6'>
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          {/* Tên loại giỏ hàng */}
          <div>
            <label className='block text-gray-700' htmlFor='name'>
              Tên loại giỏ hàng <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='name'
              {...register('name', { required: 'Tên loại giỏ hàng là bắt buộc' })}
              className='mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Nhập tên loại giỏ hàng'
            />
            {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
          </div>

          {/* Mô tả */}
          <div>
            <label className='block text-gray-700' htmlFor='description'>
              Mô tả <span className='text-red-500'>*</span>
            </label>
            <textarea
              id='description'
              {...register('description', { required: 'Mô tả là bắt buộc' })}
              className='mt-2 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              rows={4}
              placeholder='Nhập mô tả loại giỏ hàng'
            />
            {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
          </div>

          {/* Nút lưu */}
          <div className='flex justify-end'>
            <button
              type='submit'
              disabled={isPending}
              className={`px-6 py-2 rounded-md transition text-white ${isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {isPending ? 'Đang lưu...' : 'Tạo Loại Giỏ Hàng'}
            </button>
          </div>
        </form>
      </div>

      {/* Nút quay lại */}
      <div className='mt-4'>
        <Link to='/admin/basket-category'>
          <button className='bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition'>Quay lại</button>
        </Link>
      </div>
    </div>
  )
}
