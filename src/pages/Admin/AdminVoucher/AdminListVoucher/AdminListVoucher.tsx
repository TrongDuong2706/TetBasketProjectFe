import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllVoucher } from 'src/apis/voucher.api'

export default function AdminListVoucher() {
  const [page, setPage] = useState(1) // Page bắt đầu từ 1
  const pageSize = 3 // Định kích thước trang

  const {
    data: voucherData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['getAllVoucher'],
    queryFn: getAllVoucher
  })

  // Lấy danh sách voucher từ API
  const vouchers = voucherData?.data.result || []

  const totalPages = Math.ceil(vouchers.length / pageSize)

  // Phân trang
  const currentVouchers = vouchers.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-semibold text-gray-800'>Danh sách Voucher</h1>

        {/* Nút Thêm Voucher */}
        <Link to='/admin/add-voucher'>
          <button className='bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition'>
            Thêm Voucher theo phần trăm
          </button>
        </Link>

        <Link to='/admin/add-voucher-fixed'>
          <button className='bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition'>
            Thêm Voucher theo giá cứng
          </button>
        </Link>
      </div>

      {/* Bảng danh sách Voucher */}
      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <table className='w-full'>
          <thead className='bg-gray-700 text-white'>
            <tr>
              <th className='py-3 px-4 text-left'>ID</th>
              <th className='py-3 px-4 text-left'>Tên Voucher</th>
              <th className='py-3 px-4 text-left'>Mã Voucher</th>
              <th className='py-3 px-4 text-left'>Giảm Giá (%)</th>
              <th className='py-3 px-4 text-left'>Giảm Giá Cố Định</th>
              <th className='py-3 px-4 text-left'>Ngày Hết Hạn</th>
              <th className='py-3 px-4 text-left'>Số Lượng</th>
              <th className='py-3 px-4 text-left'>Trạng Thái</th>
              <th className='py-3 px-4 text-left'>Hành Động</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {isLoading ? (
              <tr>
                <td colSpan={9} className='py-3 px-4 text-center'>
                  Đang tải...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={9} className='py-3 px-4 text-center text-red-500'>
                  Đã có lỗi xảy ra!
                </td>
              </tr>
            ) : (
              currentVouchers.map((voucher) => (
                <tr key={voucher.id} className='border-b hover:bg-gray-100'>
                  <td className='py-3 px-4'>{voucher.id}</td>
                  <td className='py-3 px-4'>{voucher.name}</td>
                  <td className='py-3 px-4'>{voucher.voucherCode}</td>
                  <td className='py-3 px-4'>{voucher.discountPercentage}%</td>
                  <td className='py-3 px-4'>{voucher.fixedDiscount} VNĐ</td>
                  <td className='py-3 px-4'>{voucher.expiryDate}</td>
                  <td className='py-3 px-4'>{voucher.quantity}</td>
                  <td className='py-3 px-4'>{voucher.status}</td>
                  <td className='py-3 px-4'>
                    <div className='flex gap-2'>
                      {/* Nút sửa */}
                      <Link to={`/admin/voucher/edit/${voucher.id}`}>
                        <button className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition'>
                          Sửa
                        </button>
                      </Link>
                      {/* Nút xóa */}
                      <button className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition'>
                        Xóa
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
      <div className='flex justify-center items-center mt-4'>
        <div className='flex gap-2'>
          <button
            className={`px-4 py-2 border rounded-md transition ${page > 1 ? 'hover:bg-gray-200' : 'opacity-50 cursor-not-allowed'}`}
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            &laquo;
          </button>

          {[...Array(totalPages)].map((_, index) => {
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
            className={`px-4 py-2 border rounded-md transition ${page < totalPages ? 'hover:bg-gray-200' : 'opacity-50 cursor-not-allowed'}`}
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  )
}
