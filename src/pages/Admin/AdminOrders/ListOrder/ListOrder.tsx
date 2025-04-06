import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { changeOrderStatus, getALLOrders } from 'src/apis/order.api' // API lấy danh sách đơn hàng

export default function AdminOrder() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const [page, setPage] = useState(1) // Page bắt đầu từ 1
  const pageSize = 3 // Định kích thước trang
  const [fullName, setFullName] = useState<string | null>(null)
  const [minPrice, setMinPrice] = useState<number | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['allorders', page, fullName, minPrice, maxPrice],
    queryFn: () => getALLOrders(page, pageSize, fullName, minPrice, maxPrice)
  })

  const orders = data?.data.result.elements
  const pagination = data?.data.result

  // Hàm để reset filter
  const handleClearFilters = () => {
    setFullName(null)
    setMinPrice(null)
    setMaxPrice(null)
  }

  // Hàm để xử lý khi nhấn nút search
  const onSubmit = handleSubmit((dataFilter) => {
    setFullName(dataFilter.fullName || null)

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

    console.log('Lọc: ', JSON.stringify(dataFilter, null, 2))
  })

  const mutation = useMutation({
    mutationFn: (orderId: number) => changeOrderStatus(orderId),
    onSuccess: () => {
      toast.success('Cập nhật trạng thái đơn hàng thành công')
      setTimeout(() => {
        window.location.reload()
      }, 1000) // Chờ 1 giây cho toast hiển thị xong rồi reload
    },
    onError: () => {
      toast.error('Cập nhật trạng thái thất bại')
    }
  })

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-semibold text-gray-800'>Danh sách đơn hàng</h1>
      </div>

      {/* Search Form */}
      <form className='bg-white p-4 shadow-md rounded-md flex items-center gap-4 mb-4' onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Tìm kiếm theo tên'
          className='border p-2 rounded-md flex-1 min-w-[180px]'
          {...register('fullName')}
        />

        <select className='border p-2 rounded-md flex-1 min-w-[150px]' {...register('priceRange')}>
          <option value=''>Lọc theo giá</option>
          <option value='1'>Nhỏ hơn 500k</option>
          <option value='2'>500k - 1 triệu</option>
          <option value='3'>1 triệu - 2 triệu</option>
          <option value='4'>2 triệu - 3 triệu</option>
          <option value='5'>Lớn hơn 3 triệu</option>
        </select>

        <button className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition'>Search</button>
        <button
          className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition'
          onClick={(e) => {
            e.preventDefault()
            handleClearFilters()
          }}
        >
          Xóa lọc
        </button>
      </form>

      {/* Bảng danh sách đơn hàng */}
      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <table className='w-full'>
          <thead className='bg-gray-700 text-white'>
            <tr>
              <th className='py-3 px-4 text-left'>Mã đơn hàng</th>
              <th className='py-3 px-4 text-left'>Tên khách hàng</th>
              <th className='py-3 px-4 text-left'>Địa chỉ</th>
              <th className='py-3 px-4 text-left'>Tổng tiền</th>
              <th className='py-3 px-4 text-left'>Số điện thoại</th>
              <th className='py-3 px-4 text-left'>Tình trạng</th>
              <th className='py-3 px-4 text-left'>Hành động</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {isLoading ? (
              <tr>
                <td colSpan={7} className='py-3 px-4 text-center'>
                  Đang tải...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={7} className='py-3 px-4 text-center text-red-500'>
                  Đã có lỗi xảy ra!
                </td>
              </tr>
            ) : (
              orders?.map((order) => (
                <tr key={order.orderId} className='border-b hover:bg-gray-100'>
                  <td className='py-3 px-4'>{order.orderId}</td>
                  <td className='py-3 px-4'>{order.fullName}</td>
                  <td className='py-3 px-4'>{order.address}</td>
                  <td className='py-3 px-4'>{order.totalAmount}₫</td>
                  <td className='py-3 px-4'>{order.phoneNumber}</td>
                  <td className='py-3 px-4'>
                    <p
                      className={`font-bold ${
                        order.orderStatus === 'PENDING'
                          ? 'text-yellow-500'
                          : order.orderStatus === 'CONFIRMED'
                            ? 'text-blue-500'
                            : order.orderStatus === 'SHIPPED'
                              ? 'text-orange-500'
                              : order.orderStatus === 'DELIVERED'
                                ? 'text-green-500'
                                : order.orderStatus === 'CANCELED'
                                  ? 'text-red-500'
                                  : 'text-gray-500'
                      }`}
                    >
                      {order.orderStatus === 'PENDING'
                        ? 'Đang chờ xác nhận đơn hàng'
                        : order.orderStatus === 'CONFIRMED'
                          ? 'Đơn hàng của bạn đã được xác nhận.'
                          : order.orderStatus === 'SHIPPED'
                            ? 'Đơn hàng của bạn đã được gửi đi.'
                            : order.orderStatus === 'DELIVERED'
                              ? 'Đơn hàng của bạn đã được giao thành công.'
                              : order.orderStatus === 'CANCELED'
                                ? 'Đơn hàng đã bị hủy.'
                                : 'Trạng thái không xác định'}
                    </p>
                  </td>

                  <td className='py-3 px-4'>
                    <div className='flex gap-2'>
                      <Link to={`/admin/orders/${order.orderId}`}>
                        <button className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition'>
                          Xem đơn hàng
                        </button>
                      </Link>
                      <button
                        onClick={() => mutation.mutate(order.orderId)}
                        className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition'
                      >
                        Cập nhập trạng thái
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
