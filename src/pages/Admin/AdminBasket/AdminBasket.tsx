import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { deleteBasket, getFilterBasket } from 'src/apis/basket.api' // Sửa API đây
import { getBasketCategory, getOneBasketShell } from 'src/apis/category.api'
import { toast } from 'react-toastify'

export default function AdminBasket() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [page, setPage] = useState(1) // Page bắt đầu từ 1
  const pageSize = 3 // Định kích thước trang
  const [name, setName] = useState<string | null>(null)
  const [minPrice, setMinPrice] = useState<number | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [status, setStatus] = useState<number>(1) // Mặc định lọc theo status 1

  const { data, isLoading, isError } = useQuery({
    queryKey: ['filterbaskets', page, name, minPrice, maxPrice, categoryId, status],
    queryFn: () => getFilterBasket(page, pageSize, name, minPrice, maxPrice, categoryId, status)
  })

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError
  } = useQuery({
    queryKey: ['basketscategory'],
    queryFn: () => getBasketCategory()
  })

  const basketCategory = categoryData?.data.result

  const baskets = data?.data.result.elements
  const pagination = data?.data.result

  // Hàm để reset filter
  const handleClearFilters = () => {
    setName(null)
    setMinPrice(null)
    setMaxPrice(null)
    setCategoryId(null)
    setStatus(1) // Reset về trạng thái mặc định
  }

  // Hàm để xử lý khi nhấn nút search
  const onSubmit = handleSubmit((dataFilter) => {
    setName(dataFilter.name || null)

    const priceRange = parseInt(dataFilter.priceRange, 10)
    switch (priceRange) {
      case 1:
        setMinPrice(null)
        setMaxPrice(500000)
        break
      case 2:
        setMinPrice(500000)
        setMaxPrice(1000000)
        break
      case 3:
        setMinPrice(1000000)
        setMaxPrice(2000000)
        break
      case 4:
        setMinPrice(2000000)
        setMaxPrice(3000000)
        break
      case 5:
        setMinPrice(3000000)
        setMaxPrice(null)
        break
      default:
        setMinPrice(null)
        setMaxPrice(null)
        break
    }

    const categoryId = parseInt(dataFilter.categoryId, 10)
    setCategoryId(categoryId || null)
    setStatus(dataFilter.status || 1)

    console.log('Lọc: ', JSON.stringify(dataFilter, null, 2))
  })

  const deleteMutation = useMutation({
    mutationFn: (basketId: number) => deleteBasket(basketId),
    onSuccess: () => {
      toast('Delete thành công')
      // Optionally refetch data or handle other success actions
    }
  })

  // Define the delete handler
  const handleDelete = (basketId: number) => () => {
    deleteMutation.mutate(basketId)
  }

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-semibold text-gray-800'>Danh sách sản phẩm</h1>
        <Link to='/admin/add-basket'>
          <button className='bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition'>
            Thêm sản phẩm mới
          </button>
        </Link>
      </div>

      {/* Search Form */}
      <form
        className='bg-white p-4 shadow-md rounded-md flex items-center gap-4 mb-4'
        onSubmit={onSubmit} // Gọi handleSubmit khi bấm nút search
      >
        <input
          type='text'
          placeholder='Tìm kiếm theo tên'
          className='border p-2 rounded-md flex-1 min-w-[180px]'
          {...register('name')}
        />

        <select className='border p-2 rounded-md flex-1 min-w-[150px]' {...register('priceRange')}>
          <option value=''>Lọc theo giá</option>
          <option value='1'>Nhỏ hơn 500k</option>
          <option value='2'>500k - 1 triệu</option>
          <option value='3'>1 triệu - 2 triệu</option>
          <option value='4'>2 triệu - 3 triệu</option>
          <option value='5'>Lớn hơn 3 triệu</option>
        </select>

        <select className='border p-2 rounded-md flex-1 min-w-[150px]' {...register('status')}>
          <option value=''>Lọc theo tình trạng</option>
          <option value='0'>Hết hàng</option>
          <option value='1'>Còn hàng</option>
        </select>

        <select className='border p-2 rounded-md flex-1 min-w-[150px]' {...register('categoryId')}>
          <option value=''>Lọc theo loại giỏ hàng</option>
          {basketCategory?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition'>Search</button>
        <button
          className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition'
          onClick={(e) => {
            e.preventDefault() // Ngăn chặn hành vi mặc định của form
            handleClearFilters() // Gọi hàm xóa lọc
          }}
        >
          Xóa lọc
        </button>
      </form>

      {/* Bảng danh sách sản phẩm */}
      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <table className='w-full'>
          <thead className='bg-gray-700 text-white'>
            <tr>
              <th className='py-3 px-4 text-left'>Mã sản phẩm</th>
              <th className='py-3 px-4 text-left'>Ảnh sản phẩm</th>
              <th className='py-3 px-4 text-left'>Tên sản phẩm</th>
              <th className='py-3 px-4 text-left'>Giá</th>
              <th className='py-3 px-4 text-left'>Số lượng</th>
              <th className='py-3 px-4 text-left'>Loại sản phẩm</th>
              <th className='py-3 px-4 text-left'>Loại Vỏ</th>
              <th className='py-3 px-4 text-left'>Hành động</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {isLoading ? (
              <tr>
                <td colSpan={6} className='py-3 px-4 text-center'>
                  Đang tải...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={6} className='py-3 px-4 text-center text-red-500'>
                  Đã có lỗi xảy ra!
                </td>
              </tr>
            ) : (
              baskets?.map((basket) => (
                <tr key={basket.id} className='border-b hover:bg-gray-100'>
                  <td className='py-3 px-4'>{basket.id}</td>
                  <td className='py-3 px-4'>
                    <img
                      src={basket.images[0]?.imageUrl || 'https://via.placeholder.com/100'}
                      className='w-16 h-16 object-cover'
                    />
                  </td>
                  <td className='py-3 px-4'>{basket.name}</td>
                  <td className='py-3 px-4'>{basket.price}₫</td>
                  <td className='py-3 px-4'>{basket.quantity}</td>
                  <td className='py-3 px-4'>
                    {basketCategory?.find((category) => category.id === basket.categoryId)?.name || 'Không xác định'}
                  </td>
                  <td className='py-3 px-4'>Vỏ gỗ</td>
                  <td className='py-3 px-4'>
                    <div className='flex gap-2'>
                      <Link to={`/admin/edit-basket/${basket.id}`}>
                        <button className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition'>
                          Sửa sản phẩm
                        </button>
                      </Link>
                      <button
                        className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition'
                        onClick={handleDelete(basket.id)}
                      >
                        Xóa sản phẩm
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      {pagination && (
        <div className='flex justify-center items-center mt-4'>
          <div className='flex gap-2'>
            <button
              className={`px-4 py-2 border rounded-md transition ${pagination.hasPreviousPage ? 'hover:bg-gray-200' : 'opacity-50 cursor-not-allowed'}`}
              disabled={!pagination.hasPreviousPage}
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            >
              &laquo;
            </button>

            {[...Array(pagination.totalPages)].map((_, index) => {
              const pageNumber = index + 1
              return (
                <button
                  key={pageNumber}
                  className={`px-4 py-2 border rounded-md transition ${page === pageNumber ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            })}

            <button
              className={`px-4 py-2 border rounded-md transition ${pagination.hasNextPage ? 'hover:bg-gray-200' : 'opacity-50 cursor-not-allowed'}`}
              disabled={!pagination.hasNextPage}
              onClick={() => setPage((prev) => Math.min(prev + 1, pagination.totalPages))}
            >
              &raquo;
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
