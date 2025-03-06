import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ListOrder() {
  const [page, setPage] = useState(1) // Page bắt đầu từ 1
  const pageSize = 3 // Định kích thước trang

  // Dữ liệu giả lập cho đơn hàng
  const orders = [
    {
      id: 1,
      fullName: 'Nguyễn Văn A',
      address: 'Hà Nội',
      totalAmount: 500000,
      phoneNumber: '0123456789',
      status: 'Đang xử lý'
    },
    {
      id: 2,
      fullName: 'Trần Thị B',
      address: 'TP. HCM',
      totalAmount: 1200000,
      phoneNumber: '0987654321',
      status: 'Đã giao'
    },
    {
      id: 3,
      fullName: 'Lê Quang C',
      address: 'Đà Nẵng',
      totalAmount: 800000,
      phoneNumber: '0912345678',
      status: 'Đang xử lý'
    }
    // Thêm dữ liệu nếu cần
  ]
  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-semibold text-gray-800'>Danh sách đơn hàng</h1>
      </div>

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
            {orders.map((order) => (
              <tr key={order.id} className='border-b hover:bg-gray-100'>
                <td className='py-3 px-4'>{order.id}</td>
                <td className='py-3 px-4'>{order.fullName}</td>
                <td className='py-3 px-4'>{order.address}</td>
                <td className='py-3 px-4'>{order.totalAmount}₫</td>
                <td className='py-3 px-4'>{order.phoneNumber}</td>
                <td className='py-3 px-4'>{order.status}</td>
                <td className='py-3 px-4'>
                  <div className='flex gap-2'>
                    <Link to={`/admin/edit-order/${order.id}`}>
                      <button className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition'>
                        Xem đơn hàng
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className='flex justify-center items-center mt-4'>
        <div className='flex gap-2'>
          <button
            className={`px-4 py-2 border rounded-md transition ${page > 1 ? 'hover:bg-gray-200' : 'opacity-50 cursor-not-allowed'}`}
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            &laquo;
          </button>

          {[...Array(5)].map((_, index) => {
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
            className={`px-4 py-2 border rounded-md transition ${page < 5 ? 'hover:bg-gray-200' : 'opacity-50 cursor-not-allowed'}`}
            disabled={page >= 5}
            onClick={() => setPage((prev) => Math.min(prev + 1, 5))}
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  )
}
