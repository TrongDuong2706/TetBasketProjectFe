import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { getFilterAlcohol } from 'src/apis/basket.api'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/HomeHeader/Header'
import { Link, useLocation } from 'react-router-dom'
import { getAllBasketShell, getBasketCategory } from 'src/apis/category.api'
import { addToCart } from 'src/apis/cart.api'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { getUserId } from 'src/utils/auth'

export default function ProductList() {
  const { refetchCartCount } = useContext(AppContext)

  const [page, setPage] = useState(1)
  const pageSize = 8
  const location = useLocation()
  const userId = getUserId()

  const queryParams = new URLSearchParams(location.search)
  const searchQuery = queryParams.get('search') || null
  const categoryQuery = queryParams.get('categoryId') || null

  const [quantity, setQuantity] = useState(1)
  const [tempMinPrice, setTempMinPrice] = useState<number | null>(null)
  const [tempMaxPrice, setTempMaxPrice] = useState<number | null>(null)
  const [tempCategoryId, setTempCategoryId] = useState<number | null>(null)
  const [tempBasketShellId, setTempBasketShellId] = useState<number | null>(null)
  const [tempHasAlcohol, setTempHasAlcohol] = useState<boolean | null>(null)

  const [name, setName] = useState<string | null>(searchQuery)
  const [minPrice, setMinPrice] = useState<number | null>(null)
  const [maxPrice, setMaxPrice] = useState<number | null>(null)
  const [categoryId, setCategoryId] = useState<number | null>(categoryQuery ? parseInt(categoryQuery, 10) : null)
  const [basketShellId, setBasketShellId] = useState<number | null>(null)
  const [hasAlcohol, setHasAlcohol] = useState<boolean | null>(null)

  const { mutate: addToCartMutation, isPending: isAddingToCart } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success('Đã thêm vào giỏ hàng!')
      refetchCartCount?.() // 🔥 gọi lại để Header cập nhật ngay
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Đã xảy ra lỗi'
      toast.error('Lỗi: ' + message)
    }
  })

  const handleAddToCart = (basketId: number) => {
    addToCartMutation({
      userId,
      basketId,
      quantity
    })
  }

  const { data, isLoading } = useQuery({
    queryKey: ['filterAlcohol', page, name, minPrice, maxPrice, categoryId, basketShellId, hasAlcohol],
    queryFn: () => getFilterAlcohol(page, pageSize, name, minPrice, maxPrice, categoryId, 1, basketShellId, hasAlcohol)
  })

  const products = data?.data.result.elements || []
  const pagination = data?.data.result

  const { data: categoryData } = useQuery({
    queryKey: ['basketscategory'],
    queryFn: getBasketCategory
  })
  const basketCategory = categoryData?.data.result || []

  const { data: basketData } = useQuery({
    queryKey: ['basketshell'],
    queryFn: getAllBasketShell
  })
  const basketShells = basketData?.data.result || []

  const handlePriceFilter = (priceRange: string) => {
    const priceValue = parseInt(priceRange, 10)
    switch (priceValue) {
      case 1:
        setTempMinPrice(0)
        setTempMaxPrice(500000)
        break
      case 2:
        setTempMinPrice(500000)
        setTempMaxPrice(1000000)
        break
      case 3:
        setTempMinPrice(1000000)
        setTempMaxPrice(2000000)
        break
      case 4:
        setTempMinPrice(2000000)
        setTempMaxPrice(3000000)
        break
      case 5:
        setTempMinPrice(3000000)
        setTempMaxPrice(0)
        break
      default:
        setTempMinPrice(null)
        setTempMaxPrice(null)
        break
    }
  }

  const handleSearch = () => {
    setName(searchQuery)
    setMinPrice(tempMinPrice)
    setMaxPrice(tempMaxPrice)
    setCategoryId(tempCategoryId)
    setBasketShellId(tempBasketShellId)
    setHasAlcohol(tempHasAlcohol !== null ? tempHasAlcohol : null)
    setPage(1)
  }

  console.log('Sending hasAlcohol:', hasAlcohol)

  return (
    <>
      <Header />
      <div className='mb-5 mt-5 text-center'>
        <h2 className='text-2xl font-bold'>Quà Tết 2025 Cao Cấp</h2>
        <p className='text-sm text-gray-500'>Quà Tết đẹp, sang trọng, ý nghĩa dành cho người thân, bạn bè.</p>
      </div>

      <div className='p-5 flex flex-col items-center mx-auto max-w-screen-lg'>
        {(name || minPrice || maxPrice || categoryId || basketShellId || hasAlcohol) && (
          <div className='mb-4 p-3 bg-gray-100 border border-gray-300 rounded-md w-full'>
            <strong>Bạn đang lọc theo:</strong>
            {name && <span className='ml-2 text-blue-600'>Kết quả tìm kiếm: "{name}"</span>}
            {minPrice !== null && maxPrice !== null && (
              <span className='ml-2 text-blue-600'>
                Giá: {minPrice.toLocaleString()}₫ - {maxPrice ? maxPrice.toLocaleString() : 'trở lên'}₫
              </span>
            )}
            {categoryId && (
              <span className='ml-2 text-blue-600'>
                Thể loại giỏ: {basketCategory.find((cat) => cat.id === categoryId)?.name || 'Không xác định'}
              </span>
            )}
            {basketShellId && (
              <span className='ml-2 text-blue-600'>
                Thể loại vỏ: {basketShells.find((shell) => shell.id === basketShellId)?.name || 'Không xác định'}
              </span>
            )}
            {hasAlcohol !== null && (
              <span className='ml-2 text-blue-600'>{hasAlcohol ? 'Có rượu' : 'Không có rượu'}</span>
            )}
          </div>
        )}
        <div className='w-full flex justify-between gap-4'>
          <div className='mb-5 w-full grid grid-cols-4 gap-4 bg-gray-100 p-4 border border-gray-200 rounded-md shadow-md'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Giá</label>
              <select
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
                onChange={(e) => handlePriceFilter(e.target.value)}
              >
                <option value=''>Lọc theo giá</option>
                <option value='1'>Nhỏ hơn 500k</option>
                <option value='2'>500k - 1 triệu</option>
                <option value='3'>1 triệu - 2 triệu</option>
                <option value='4'>2 triệu - 3 triệu</option>
                <option value='5'>Lớn hơn 3 triệu</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Thể loại giỏ</label>
              <select
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
                onChange={(e) => setTempCategoryId(parseInt(e.target.value, 10) || null)}
              >
                <option value=''>Lọc theo thể loại giỏ</option>
                {basketCategory.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>Thể loại vỏ</label>
              <select
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
                onChange={(e) => setTempBasketShellId(parseInt(e.target.value, 10) || null)}
              >
                <option value=''>Lọc theo thể loại vỏ</option>
                {basketShells.map((shell) => (
                  <option key={shell.id} value={shell.id}>
                    {shell.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700'>Có rượu hay không</label>
              <select
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md'
                onChange={(e) =>
                  setTempHasAlcohol(e.target.value === 'true' ? true : e.target.value === 'false' ? false : null)
                }
              >
                <option value=''>Tất cả</option>
                <option value='true'>Có rượu</option>
                <option value='false'>Không có rượu</option>
              </select>
            </div>
          </div>
          <button
            className='mb-5 bg-indigo-600 text-white px-6 py-2 rounded-md shadow hover:bg-indigo-700'
            onClick={handleSearch}
          >
            Lọc
          </button>
        </div>

        <div className='mt-5 mb-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
          {isLoading ? (
            <p className='text-gray-500 text-center'>Đang tải...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className='p-4 cursor-pointer relative group'>
                {/* Sale Label */}
                <div className='absolute top-10 left-4 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded'>
                  SALE
                </div>

                {/* Product Image */}
                {product.images && product.images[0] && (
                  <Link to={`/product/${product.id}`}>
                    <img
                      className='w-full h-[75%] rounded-lg'
                      height='300'
                      src={product.images[0].imageUrl}
                      width='300'
                      alt={product.name}
                    />
                  </Link>
                )}

                {/* Product Name - Always visible */}
                <Link to={`/product/${product.id}`}>
                  <p
                    className='mt-4 text-lg text-center font-medium overflow-hidden text-ellipsis whitespace-nowrap'
                    style={{ maxWidth: '300px' }}
                  >
                    {product.name}
                  </p>
                </Link>

                {/* Container for Prices and Add to Cart Button */}
                <div className='relative'>
                  {/* Prices - Hidden on hover */}
                  <div className='text-center mt-2 flex gap-1 items-center justify-center transition-opacity duration-300 ease-in group-hover:opacity-0'>
                    <p className='text-gray-500 text-lg line-through'>{(product.price + 500000).toLocaleString()} đ</p>
                    <p className='text-red-500 text-lg font-bold'>{product.price.toLocaleString()} đ</p>
                  </div>

                  {/* Add to Cart Button - Visible on hover */}
                  <div className='absolute inset-x-0 -bottom-2 flex justify-center'>
                    <button
                      className='bg-red-500 text-white px-4 py-2 rounded-lg w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in'
                      onClick={(e) => {
                        e.stopPropagation() // Prevents the onClick of the parent div from firing
                        handleAddToCart(product.id) // Call the function to add product to the cart
                      }}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className='text-black text-center text-3xl col-span-4 font-semibold'>
              Không có sản phẩm nào phù hợp với tiêu chí
            </p>
          )}
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
                «
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
                »
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
