import { useQuery, useMutation } from '@tanstack/react-query'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { getAllBasketShell, getBasketCategory } from 'src/apis/category.api'
import { getOneBasket, updateBasket } from 'src/apis/basket.api'
import { Image } from 'src/types/image.type'

export default function AdminEditBasket() {
  const { basketId } = useParams<{ basketId: string }>()
  const id = basketId ? parseInt(basketId, 10) : 0

  const [existingImages, setExistingImages] = useState<Image[]>([])

  // Fetch basket details
  const { data: basketData, isLoading: basketLoading } = useQuery({
    queryKey: ['basket', basketId],
    queryFn: () => getOneBasket(basketId),
    enabled: !!basketId
  })

  // Fetch basket categories and shells
  const { data: categoryData } = useQuery({
    queryKey: ['basketscategory'],
    queryFn: getBasketCategory
  })
  const { data: basketShellData } = useQuery({
    queryKey: ['basketshell'],
    queryFn: getAllBasketShell
  })

  const basketCategory = categoryData?.data.result
  const basketShell = basketShellData?.data.result

  // Initialize form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm()

  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    if (basketData) {
      const basket = basketData.data.result
      setValue('name', basket.name)
      setValue('description', basket.description)
      setValue('price', basket.price)
      setValue('quantity', basket.quantity)
      setValue('categoryId', basket.categoryId)
      setValue('status', basket.status)
      setValue('basketShellId', basket.basketShellId)
      setItems(basket.itemNames || [])
      setExistingImages(basket.images || []) // Lưu danh sách ảnh cũ
    }
  }, [basketData, setValue])

  const updateBasketMutation = useMutation({
    mutationFn: (formData: FormData) => updateBasket(basketId, formData),
    onSuccess: () => {
      toast('Cập nhật giỏ hàng thành công')
    },
    onError: () => {
      toast.error('Có lỗi khi cập nhật giỏ hàng')
    }
  })

  const handleAddItem = () => setItems([...items, ''])
  const handleItemChange = (index: any, value: any) => {
    const newItems = [...items]
    newItems[index] = value
    setItems(newItems)
  }

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData()

    const basketData = {
      name: data.name,
      description: data.description,
      price: data.price,
      quantity: data.quantity,
      categoryId: data.categoryId,
      status: data.status,
      basketShellId: data.basketShellId,
      itemNames: items
    }

    formData.append('basket', new Blob([JSON.stringify(basketData)], { type: 'application/json' }))

    // Nếu không có ảnh mới, gửi flag để giữ ảnh cũ
    if (!data.images || data.images.length === 0) {
      formData.append('keepExistingImages', 'true')
    } else {
      // Nếu có ảnh mới, chỉ gửi ảnh mới
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i])
      }
    }

    updateBasketMutation.mutate(formData)
  })

  if (basketLoading) return <p>Loading...</p>

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-2xl font-semibold text-gray-800 mb-6'>Chỉnh sửa giỏ hàng</h1>
      <form
        className='bg-white p-6 shadow-md rounded-md grid grid-cols-1 md:grid-cols-2 gap-6'
        onSubmit={onSubmit}
        noValidate
      >
        {/* Tên giỏ hàng */}
        <div className='col-span-1 flex flex-col'>
          <label className='text-gray-700 mb-1'>Tên giỏ hàng</label>
          <input
            type='text'
            className='w-full p-2 border rounded-md'
            placeholder='Nhập tên giỏ hàng'
            {...register('name', { required: 'Tên giỏ hàng là bắt buộc' })}
          />
        </div>

        {/* Giá */}
        <div className='col-span-1 flex flex-col'>
          <label className='text-gray-700 mb-1'>Giá</label>
          <input
            type='number'
            className='w-full p-2 border rounded-md'
            placeholder='Nhập giá giỏ hàng'
            {...register('price', { required: 'Giá là bắt buộc' })}
          />
        </div>

        {/* Số lượng */}
        <div className='col-span-1 flex flex-col'>
          <label className='text-gray-700 mb-1'>Số lượng</label>
          <input
            type='number'
            className='w-full p-2 border rounded-md'
            placeholder='Nhập số lượng'
            {...register('quantity', { required: 'Số lượng là bắt buộc' })}
          />
        </div>

        {/* Loại giỏ hàng */}
        <div className='col-span-1 flex flex-col'>
          <label className='text-gray-700 mb-1'>Loại giỏ hàng</label>
          <select
            className='w-full p-2 border rounded-md'
            {...register('categoryId', { required: 'Loại giỏ hàng là bắt buộc' })}
          >
            <option value=''>Chọn loại giỏ hàng</option>
            {basketCategory?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {/* Vỏ hàng */}
        <div className='col-span-1 flex flex-col'>
          <label className='text-gray-700 mb-1'>Loại vỏ</label>
          <select
            className='w-full p-2 border rounded-md'
            {...register('basketShellId', { required: 'Vỏ là bắt buộc' })}
          >
            <option value=''>Chọn loại vỏ</option>
            {basketShell?.map((basketshell) => (
              <option key={basketshell.id} value={basketshell.id}>
                {basketshell.name}
              </option>
            ))}
          </select>
        </div>

        {/* Trạng thái */}
        <div className='col-span-1 flex flex-col'>
          <label className='text-gray-700 mb-1'>Trạng thái</label>
          <select
            className='w-full p-2 border rounded-md'
            {...register('status', { required: 'Trạng thái là bắt buộc' })}
          >
            <option value='1'>Còn hàng</option>
            <option value='0'>Hết hàng</option>
            <option value='2'>Ngừng bán</option>
          </select>
        </div>

        {/* Miêu tả */}
        <div className='col-span-1 flex flex-col'>
          <label className='text-gray-700 mb-1'>Miêu tả</label>
          <textarea
            className='w-full p-2 border rounded-md'
            placeholder='Nhập miêu tả giỏ hàng'
            {...register('description')}
          />
        </div>

        {/* Tải ảnh */}
        <div className='col-span-1 flex flex-col'>
          <label className='text-gray-700 mb-1'>Tải ảnh</label>
          <input
            type='file'
            className='w-full p-2 border rounded-md'
            accept='image/*'
            multiple
            {...register('images')}
          />
        </div>
        {/* Ảnh hiện có */}
        <div className='col-span-1 flex flex-col'>
          <label className='text-gray-700 mb-1'>Ảnh hiện có</label>
          <div className='flex flex-wrap gap-2'>
            {existingImages.map((img, index) => (
              <div key={index} className='relative'>
                <img src={img.imageUrl} alt={`Ảnh ${index + 1}`} className='w-20 h-20 object-cover rounded-md border' />
              </div>
            ))}
          </div>
        </div>

        {/* Danh sách Items */}
        <div className='col-span-2 flex flex-col'>
          <label className='text-gray-700 mb-1'>Vật Phẩm</label>
          <div className='space-y-2'>
            {items.map((item, index) => (
              <input
                key={index}
                type='text'
                className='w-full p-2 border rounded-md'
                placeholder='Nhập tên item'
                value={item}
                onChange={(e) => handleItemChange(index, e.target.value)}
              />
            ))}
            <button
              type='button'
              className='bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition'
              onClick={handleAddItem}
            >
              + Thêm Vật Phẩm
            </button>
          </div>
        </div>

        {/* Nút thêm giỏ hàng */}
        <div className='col-span-2'>
          <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition'>
            Sửa giỏ hàng
          </button>
        </div>
      </form>
    </div>
  )
}
