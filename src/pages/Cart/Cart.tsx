import React, { useContext, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/HomeHeader/Header'
import { getUserId } from 'src/utils/auth'
import { deleteItemInCart, getAllItemInCart, updateItemInCartQuantity } from 'src/apis/cart.api'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'

interface CartItem {
  id: number
  basketId: number
  name: string
  imageUrls: string[] // Giữ nguyên là mảng
  quantity: number
  price: number
}

// Hàm helper để chuẩn hóa imageUrls
const normalizeImageUrls = (imageUrls: string | string[]): string[] => {
  if (Array.isArray(imageUrls)) return imageUrls
  return [imageUrls]
}

export default function Cart() {
  const { refetchCartCount } = useContext(AppContext)

  const userId = getUserId()
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<number | null>(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ['cartItems', userId],
    queryFn: () => getAllItemInCart(userId),
    enabled: !!userId
  })

  const mutation = useMutation({
    mutationFn: ({ basketId, quantityChange }: { basketId: number; quantityChange: number }) =>
      updateItemInCartQuantity({ userId, basketId, quantityChange }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems', userId] })
      refetchCartCount?.() // 🔥 gọi lại để Header cập nhật ngay
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Đã xảy ra lỗi'
      toast.error('Lỗi: ' + message)
    }
  })

  const deleteMutation = useMutation({
    mutationFn: ({ basketId }: { basketId: number }) => deleteItemInCart(userId, basketId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cartItems', userId] })
      setIsModalOpen(false)
      setItemToDelete(null)
      refetchCartCount?.() // 🔥 gọi lại để Header cập nhật ngay
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Đã xảy ra lỗi'
      toast.error('Lỗi: ' + message)
    }
  })

  const handleDeleteClick = (basketId: number) => {
    setItemToDelete(basketId)
    setIsModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      deleteMutation.mutate({ basketId: itemToDelete })
    }
  }

  const handleCancelDelete = () => {
    setIsModalOpen(false)
    setItemToDelete(null)
  }

  if (isLoading) {
    return <div className='text-center text-lg mt-6'>Đang tải giỏ hàng...</div>
  }

  if (error) {
    return <div className='text-center text-lg mt-6 text-red-500'>Lỗi khi tải giỏ hàng!</div>
  }

  // Chuẩn hóa dữ liệu từ API
  const rawCartItems = data?.data.result || []
  const cartItems: CartItem[] = rawCartItems.map((item: any) => ({
    ...item,
    imageUrls: normalizeImageUrls(item.imageUrls)
  }))

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex justify-center items-center bg-gray-200 bg-cover bg-center p-6'>
        <div className='bg-white shadow-lg rounded-lg w-full max-w-5xl p-6'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Giỏ hàng</h2>

          <table className='w-full border-collapse border border-gray-300'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border p-2'>STT</th>
                <th className='border p-2'>Ảnh đại diện</th>
                <th className='border p-2'>Tên sản phẩm</th>
                <th className='border p-2'>Số lượng</th>
                <th className='border p-2'>Đơn giá</th>
                <th className='border p-2'>Thành tiền</th>
                <th className='border p-2'>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className='text-center p-4 text-gray-500'>
                    Giỏ hàng của bạn đang trống.
                  </td>
                </tr>
              ) : (
                cartItems.map((item: CartItem, index: number) => (
                  <tr key={item.id} className='text-center'>
                    <td className='border p-2'>{index + 1}</td>
                    <td className='border p-2'>
                      <img src={item.imageUrls[0]} className='w-32 h-32 object-cover mx-auto' alt={item.name} />
                    </td>
                    <td className='border p-2'>{item.name}</td>
                    <td className='border p-2'>
                      <div className='flex items-center justify-center'>
                        <button
                          className='px-3 py-1 bg-gray-300 rounded'
                          onClick={() => mutation.mutate({ basketId: item.basketId, quantityChange: -1 })}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <p className='border w-12 text-center mx-2'>{item.quantity}</p>
                        <button
                          className='px-3 py-1 bg-gray-300 rounded'
                          onClick={() => mutation.mutate({ basketId: item.basketId, quantityChange: 1 })}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className='border p-2'>{item.price.toLocaleString()}</td>
                    <td className='border p-2'>{(item.price * item.quantity).toLocaleString()}</td>
                    <td className='border p-2'>
                      <button
                        className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'
                        onClick={() => handleDeleteClick(item.basketId)}
                      >
                        🗑 Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className='mt-6 flex justify-between'>
            <a href='/' className='text-blue-500'>
              ← Quay lại trang sản phẩm
            </a>
            <Link to='/place-order'>
              <button className='bg-blue-500 text-white px-4 py-2 rounded'>Đặt Hàng</button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />

      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
            <h3 className='text-lg font-semibold mb-4'>Xác nhận xóa</h3>
            <p className='mb-6'>Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?</p>
            <div className='flex justify-end gap-4'>
              <button className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400' onClick={handleCancelDelete}>
                Hủy
              </button>
              <button
                className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
                onClick={handleConfirmDelete}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
