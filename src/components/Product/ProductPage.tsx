import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAllsBasket, getBasketByCategory } from 'src/apis/basket.api'
import { addToCart } from 'src/apis/cart.api'
import { getUserId } from 'src/utils/auth'

const ProductPage: React.FC = () => {
  const userId = getUserId()
  const [quantity, setQuantity] = useState(1)

  const { mutate: addToCartMutation, isPending: isAddingToCart } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success('Đã thêm vào giỏ hàng!')
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Đã xảy ra lỗi'
      toast.error('Lỗi: ' + message)
    }
  })

  const navigate = useNavigate()
  const [page, setPage] = useState(1)
  const pageSize = 5

  const { data, isLoading, isError } = useQuery({
    queryKey: ['getBasketByCategory', page],
    queryFn: () => getBasketByCategory(page, pageSize)
  })

  const baskets = data?.data.result

  if (isLoading) return <div>Đang tải dữ liệu....</div>
  if (isError) return <div>Lỗi khi tải dữ liệu....!</div>

  const handleAddToCart = (basketId: number) => {
    addToCartMutation({
      userId,
      basketId,
      quantity
    })
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='text-center mb-8'>
        <h1 className='text-lg font-medium'>Quà Tết Happybox</h1>
        <h2 className='text-3xl font-bold mt-2'>HỘP QUÀ TẾT CAO CẤP</h2>
        <p className='mt-2 text-sm'>
          Hộp quà Tết Happybox được lựa chọn từ những sản phẩm cao cấp, chất lượng thượng hạng cùng với hộp quà được làm
          tỉ mỉ, đẹp và sang trọng, đẳng cấp.
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {baskets?.elements.map((basket) => (
          <div
            key={basket.id}
            className='p-4 cursor-pointer relative group' // Added `group` for hover effects
            onClick={() => navigate(`/product/${basket.id}`)}
          >
            {/* Sale Label */}
            <div className='absolute top-10 left-4 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded'>SALE</div>

            {/* Product Image */}
            {basket.images && basket.images[0] && (
              <img
                className='w-full h-auto rounded-lg'
                height='300'
                src={basket.images[0].imageUrl}
                width='300'
                alt={basket.name}
              />
            )}

            {/* Product Name - Always visible */}
            <p className='mt-4 text-lg text-center font-greatvibes underline'>{basket.name}</p>

            {/* Container for Prices and Add to Cart Button */}
            <div className='relative'>
              {/* Prices - Hidden on hover */}
              <div className='text-center mt-2 flex gap-1 items-center transition-opacity duration-300 ease-in group-hover:opacity-0'>
                <p className='text-gray-500 text-xl line-through'>{basket.price + 500000} đ</p>
                <p className='text-red-500 text-xl font-bold'>{basket.price.toLocaleString()} đ</p>
              </div>

              {/* Add to Cart Button - Visible on hover */}
              <div className='absolute inset-x-0 -bottom-3 flex justify-center'>
                <button
                  className='bg-red-500 w-full text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in'
                  onClick={(e) => {
                    e.stopPropagation() // Prevents the onClick of the parent div from firing
                    handleAddToCart(basket.id) // Call the function to add product to the cart
                  }}
                  disabled={isAddingToCart} // Disable button when adding to cart
                >
                  {isAddingToCart ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='text-center mt-8'>
        <a href='/productList' className='bg-red-500 text-white px-6 py-2 rounded-full'>
          XEM THÊM
        </a>
      </div>
    </div>
  )
}

export default ProductPage
