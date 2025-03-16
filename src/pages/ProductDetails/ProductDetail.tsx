import { useQuery } from '@tanstack/react-query'
import { Gift, Package, PhoneCall, ShieldCheck, ShoppingCart, Truck } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAllRelatedBasket, getOneBasket } from 'src/apis/basket.api'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/HomeHeader/Header'
import SignupSalePage from 'src/components/Product/SignupSalePage'
import ProductDetailInformation from 'src/components/ProductDetailInformation/ProductDetailInformation'
import ProductDetailInformation2 from 'src/components/ProductDetailInformation2/ProductDetailInformation2'
import { Button } from 'src/components/ui/Button'
import { Card, CardContent } from 'src/components/ui/card'

export default function ProductDetail() {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0)
  const [showForm, setShowForm] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const [page, setPage] = useState(1) // Page bắt đầu từ 1
  const size = 3 // Định kích thước trang

  const { basketId } = useParams<{ basketId: string }>()
  const id = basketId ? parseInt(basketId, 10) : 0

  // Fetch basket details
  const { data: basketData, isLoading: basketLoading } = useQuery({
    queryKey: ['basket', basketId],
    queryFn: () => getOneBasket(basketId),
    enabled: !!basketId
  })

  const basket = basketData?.data.result
  const categoryId = basketData?.data.result.categoryId

  const { data: basketRelated, isLoading: isLoadingRelated } = useQuery({
    queryKey: ['basketRelated', page, size, categoryId],
    queryFn: () => getAllRelatedBasket(page, size, categoryId)
  })

  const basketCategoryRelated = basketRelated?.data.result.elements

  const promoData = [
    {
      code: 'HAPPY200',
      description: 'Giảm 200k cho đơn hàng từ 4,500,000đ'
    },
    {
      code: 'HAPPY100',
      description: 'Giảm 100k cho đơn hàng từ 2,500,000đ'
    },
    {
      code: 'HAPPY50',
      description: 'Giảm 50k cho đơn hàng từ 1,500,000đ'
    }
  ]

  const faqs = [
    {
      question: 'Thời gian giao hàng mất bao lâu?',
      answer: 'Giao hàng siêu tốc trong 2-3 giờ, tùy thuộc vào khu vực.'
    },
    {
      question: 'Có thể đổi trả sản phẩm không?',
      answer: 'Có, đổi trả trong 7 ngày nếu có lỗi từ nhà sản xuất (có phí).'
    }
  ]

  return (
    <>
      <Header />
      <div className='w-full flex justify-center'>
        <div className='w-[68%] mx-2 p-4 mt-2 justify-center'>
          {/* Main Content */}
          <div className='flex flex-col lg:flex-row gap-6'>
            {/* Left Section: Product Images */}
            <div className='lg:w-1/2'>
              <div className='relative'>
                <img src={basket?.images.sort((a, b) => a.id - b.id)[0].imageUrl} className='w-full rounded-lg' />

                <span className='absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm'>SALE</span>
              </div>
              {/* Thumbnail Images */}
              <div className='flex gap-2 mt-4'>
                {basket?.images.map((thumbnail, index) => (
                  <img
                    key={index}
                    src={thumbnail.imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    className='flex-1 w-20 h-20 rounded-lg cursor-pointer border border-gray-300 hover:border-red-500'
                  />
                ))}
              </div>
              {/* Additional Info Below Images */}
              <div className='flex gap-4 mt-4 text-sm text-gray-600'>
                <div className='flex items-center gap-1'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M5 4a2 2 0 012-2h6a2 2 0 012 2v12l-5-3-5 3V4z' />
                  </svg>
                  <span>Giao hàng siêu tốc trong 2-3h</span>
                </div>
                <div className='flex items-center gap-1'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-10a1 1 0 00-1 1v3a1 1 0 002 0V7a1 1 0 00-1-1z' />
                  </svg>
                  <span>Chỉ khu vực có sẵn số lượng trên 05 phần</span>
                </div>
                <div className='flex items-center gap-1'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-10a1 1 0 00-1 1v3a1 1 0 002 0V7a1 1 0 00-1-1z' />
                  </svg>
                  <span>Cửa hàng tại Hà Nội</span>
                </div>
              </div>
            </div>

            {/* Right Section: Product Details */}
            <div className='lg:w-1/2'>
              {/* Product Name */}
              <h1 className='text-2xl font-bold text-gray-800'>{basket?.name}</h1>

              {/* Rating and Sold */}
              {/* <div className='flex items-center gap-2 mt-2'>
                <div className='flex text-yellow-400'></div>
                <span className='text-gray-600'>
                  {product.rating} ({product.reviews} đánh giá)
                </span>
                <span className='text-gray-600'>Đã bán {product.sold}</span>
              </div> */}

              {/* Price and Discount */}
              <div className='mt-4'>
                <span className='text-gray-500 line-through'>{basket?.price}đ</span>
                <span className='text-red-500 text-2xl font-bold ml-2'>{basket?.price}đ</span>
              </div>

              {/* Product Description */}
              <ul className='mt-4 text-gray-700 list-disc list-inside'>
                {basket?.itemNames.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
              <div>Miêu tả: {basket?.description}</div>
              <div className='mt-4 flex items-center gap-2'>
                <span className='text-gray-700 font-medium'>Số lượng:</span>
                <button
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  className='bg-gray-200 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-300'
                >
                  -
                </button>
                <span className='px-4 py-1 border rounded-md'>{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className='bg-gray-200 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-300'
                >
                  +
                </button>
              </div>

              {/* Discount Banners */}
              <div className='mt-4'>
                <div className='flex flex-row justify-center items-center gap-2'>
                  {/* Previous button */}
                  <button className='bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-300'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                    </svg>
                  </button>

                  {/* Current coupon */}
                  <div className='flex bg-white shadow-md rounded-lg overflow-hidden w-[95%]'>
                    {/* Left coupon icon with jagged edge */}
                    <div className='relative w-16 flex items-center justify-center border-r border-dashed border-gray-300 bg-white p-2'>
                      <img
                        src='https://happybox.vn/wp-content/uploads/2022/10/coupon.png'
                        alt='Coupon'
                        className='w-10 h-10'
                      />
                      {/* Create the jagged edge effect on the right of the icon */}
                      <div
                        className='absolute right-0 top-0 bottom-0 w-[2px] h-full'
                        style={{
                          backgroundImage:
                            'radial-gradient(circle at -1px 6px, transparent 0, transparent 3px, white 3px, white 6px)',
                          backgroundSize: '2px 12px',
                          backgroundRepeat: 'repeat-y',
                          backgroundPosition: 'right center'
                        }}
                      ></div>
                    </div>

                    {/* Coupon content */}
                    <div className='flex-1 p-3 flex flex-col items-start'>
                      <h2 className='text-sm font-semibold mb-1'>NHẬP MÃ: {promoData[currentPromoIndex].code}</h2>
                      <p className='text-xs text-gray-500 mb-3'>{promoData[currentPromoIndex].description}</p>
                      <div className='flex justify-between w-full items-end'>
                        <button className='bg-orange-500 text-white py-1 px-3 rounded-full text-sm'>Sao chép mã</button>
                        <a href='#' className='text-blue-500 text-xs'>
                          Điều kiện
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Next button */}
                  <button className='bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-300'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                    </svg>
                  </button>
                </div>

                {/* Pagination indicators */}
                <div className='flex justify-center mt-2'>
                  {promoData.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 mx-1 rounded-full ${
                        index === currentPromoIndex ? 'bg-orange-500' : 'bg-gray-300'
                      }`}
                      onClick={() => setCurrentPromoIndex(index)}
                      style={{ cursor: 'pointer' }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className='mt-4 flex flex-col items-center gap-2'>
                <div className='bg-blue-400 w-[95%] flex gap-3 items-center justify-center px-4 py-2 rounded-full'>
                  <PhoneCall className='text-white' size={18} />
                  <span className='text-white font-bold'>0912691343 (Zalo)</span>
                </div>
                <div className='flex-1 flex justify-center w-[95%] bg-orange-500 gap-3 items-center px-4 py-3 rounded-full border border-gray-300'>
                  <span className='text-white flex gap-3'>
                    <ShoppingCart />
                    Thêm vào giỏ hàng
                  </span>
                </div>
                <div className='flex-1 flex justify-center w-[95%] bg-teal-500 gap-3 items-center px-4 py-3 rounded-full border border-gray-300'>
                  <span className='text-white'>ĐẶT MUA GIAO TẬN NƠI (THANH TOÁN KHI NHẬN HÀNG)</span>
                </div>
              </div>

              {/* Additional Info Styled Section */}
              <ProductDetailInformation2 />
            </div>
          </div>

          {/* Related Products Section */}
          <div className='mt-8'>
            <h2 className='text-xl font-bold text-gray-800'>Sản Phẩm Liên Quan</h2>
            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
              {basketCategoryRelated?.map((product) => (
                <Link to={`/product/${product.id}`}>
                  <div key={product.id} className='border rounded-lg p-4'>
                    <img
                      src={product.images[0].imageUrl}
                      alt={product.name}
                      className='w-full h-32 object-cover rounded-lg'
                    />
                    <h3 className='text-lg font-semibold mt-2'>{product.name}</h3>
                    <p className='text-red-500 font-bold mt-1'>{product.price}</p>
                    <button className='mt-2 bg-red-500 text-white px-4 py-2 rounded-full'>Xem Chi Tiết</button>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className='mt-8'>
            <h2 className='text-xl font-bold text-gray-800'>Câu Hỏi Thường Gặp</h2>
            <div className='mt-4'>
              {faqs.map((faq, index) => (
                <div key={index} className='mb-4'>
                  <h3 className='font-semibold text-gray-800'>{faq.question}</h3>
                  <p className='text-gray-600 mt-1'>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className='mt-10 grid grid-cols-4 gap-4'>
            <Button className='bg-[#f6e6cf] hover:bg-[#f36161] text-black p-2 rounded-lg text-sm flex flex-col items-center'>
              <Gift className='mb-1 text-sm text-black' />
              <span className='text-black'>Quà Tết</span>
            </Button>
            <Button className='bg-[#f6e6cf] hover:bg-[#f36161] text-black p-2 rounded-lg text-sm flex flex-col items-center'>
              <Truck className='mb-1 text-sm text-black' />
              <span className='text-black'>Hộp quà Tết</span>
            </Button>
            <Button className='bg-[#f6e6cf] hover:bg-[#f36161] text-black p-2 rounded-lg text-sm flex flex-col items-center'>
              <ShoppingCart className='mb-1 text-sm text-black' />
              <span className='text-black'>Giỏ quà Tết</span>
            </Button>
            <Button className='bg-[#f6e6cf] hover:bg-[#f36161] text-black p-2 rounded-lg text-sm flex flex-col items-center'>
              <ShieldCheck className='mb-1 text-sm text-black' />
              <span className='text-black'>Quà tặng sức khỏe</span>
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
