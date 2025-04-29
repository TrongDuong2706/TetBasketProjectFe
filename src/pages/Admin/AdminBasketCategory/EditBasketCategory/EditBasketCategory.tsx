import { useQuery, useMutation } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getOneBasketCategory, updateBasketCategory } from 'src/apis/category.api'

export default function EditBasketCategory() {
  const { basketCategoryId } = useParams()
  const categoryId = basketCategoryId ? parseInt(basketCategoryId, 10) : undefined
  const navigate = useNavigate()

  // Fetch dữ liệu loại giỏ hàng
  const { data: categoryData, isLoading } = useQuery({
    queryKey: ['basketCategory', categoryId],
    queryFn: () => getOneBasketCategory(categoryId),
    enabled: !!categoryId
  })

  // Khởi tạo form
  // Khởi tạo form
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      description: ''
    }
  })

  // Set dữ liệu vào form sau khi fetch xong
  useEffect(() => {
    if (categoryData) {
      const category = categoryData.data.result
      setValue('name', String(category.name || ''))
      setValue('description', String(category.description || ''))
    }
  }, [categoryData, setValue])

  // Mutation để update dữ liệu
  const mutation = useMutation({
    mutationFn: (data: { name: string; description: string }) =>
      updateBasketCategory(categoryId as number, data.name, data.description),
    onSuccess: () => {
      toast('Cập nhập thành công')
      navigate('/admin/basket-category')
    },
    onError: () => {
      alert('Có lỗi xảy ra, vui lòng thử lại!')
    }
  })

  // Xử lý submit form
  const onSubmit = (data: { name: string; description: string }) => {
    mutation.mutate(data)
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-2xl font-semibold text-gray-800 mb-6'>Chỉnh sửa loại giỏ hàng</h1>

      <div className='bg-white p-6 shadow-md rounded-md'>
        <form className='grid grid-cols-1 gap-6' onSubmit={handleSubmit(onSubmit)}>
          {/* Tên loại giỏ hàng */}
          <div className='flex flex-col'>
            <label className='text-gray-700'>Tên loại giỏ hàng</label>
            <input
              type='text'
              className='p-2 border rounded-md'
              {...register('name', { required: 'Tên loại giỏ hàng là bắt buộc' })}
            />
            {errors.name && <span className='text-red-500 text-sm mt-1'>{errors.name.message}</span>}
          </div>

          {/* Mô tả */}
          <div className='flex flex-col'>
            <label className='text-gray-700'>Mô tả</label>
            <textarea className='p-2 border rounded-md' rows={4} {...register('description')} />
          </div>

          {/* Nút lưu và quay lại */}
          <div className='flex justify-between'>
            <Link to='/admin/basket-category'>
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
