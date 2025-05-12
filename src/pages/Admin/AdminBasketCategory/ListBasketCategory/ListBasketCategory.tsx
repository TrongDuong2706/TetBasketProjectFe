import { useQuery, useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getBasketCategory, deleteBasketCategory } from 'src/apis/category.api'
import { toast } from 'react-toastify'

export default function ListBasketCategory() {
  const [page, setPage] = useState(1) // Page bắt đầu từ 1
  const pageSize = 3 // Định kích thước trang

  // Lấy dữ liệu từ API
  const {
    data: categoryData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['basketscategory'],
    queryFn: getBasketCategory
  })

  const categoryBasket = categoryData?.data.result || []
  const totalPages = Math.ceil(categoryBasket.length / pageSize)

  // Phân trang
  const currentCategories = categoryBasket.slice((page - 1) * pageSize, page * pageSize)

  // Mutation để xóa giỏ hàng
  const { mutate: deleteCategory, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => deleteBasketCategory(id),
    onSuccess: () => {
      toast.success('🎉 Xóa loại giỏ hàng thành công!')
      // Refetch data or update the list after deletion
      window.location.reload()
    },
    onError: (error: any) => {
      toast.error(`❌ Xóa loại giỏ hàng thất bại`)
    }
  })

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa loại giỏ hàng này?')) {
      deleteCategory(id)
    }
  }

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-semibold text-gray-800'>Danh sách thể loại giỏ hàng</h1>

        {/* Nút Thêm */}
        <Link to='/admin/add-basket-category'>
          <button className='bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition'>
            Thêm giỏ loại giỏ hàng
          </button>
        </Link>
      </div>

      {/* Bảng danh sách thể loại giỏ hàng */}
      <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
        <table className='w-full'>
          <thead className='bg-gray-700 text-white'>
            <tr>
              <th className='py-3 px-4 text-left'>ID</th>
              <th className='py-3 px-4 text-left'>Tên</th>
              <th className='py-3 px-4 text-left'>Mô tả</th>
              <th className='py-3 px-4 text-left'>Hành động</th>
            </tr>
          </thead>
          <tbody className='text-gray-700'>
            {isLoading ? (
              <tr>
                <td colSpan={4} className='py-3 px-4 text-center'>
                  Đang tải...
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={4} className='py-3 px-4 text-center text-red-500'>
                  Đã có lỗi xảy ra!
                </td>
              </tr>
            ) : (
              currentCategories.map((category) => (
                <tr key={category.id} className='border-b hover:bg-gray-100'>
                  <td className='py-3 px-4'>{category.id}</td>
                  <td className='py-3 px-4'>{category.name}</td>
                  <td className='py-3 px-4'>{category.description}</td>
                  <td className='py-3 px-4'>
                    <div className='flex gap-2'>
                      {/* Nút sửa */}
                      <Link to={`/admin/basket-category/edit/${category.id}`}>
                        <button className='bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition'>
                          Sửa
                        </button>
                      </Link>
                      {/* Nút xóa */}
                      <button
                        onClick={() => handleDelete(category.id)}
                        className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition'
                        disabled={isDeleting}
                      >
                        {isDeleting ? 'Đang xóa...' : 'Xóa'}
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
