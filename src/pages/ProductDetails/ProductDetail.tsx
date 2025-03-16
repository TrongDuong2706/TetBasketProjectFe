import { Gift, Package, PhoneCall, ShieldCheck, ShoppingCart, Truck } from 'lucide-react'
import React, { useState } from 'react'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/HomeHeader/Header'
import SignupSalePage from 'src/components/Product/SignupSalePage'
import { Button } from 'src/components/ui/Button'
import { Card, CardContent } from 'src/components/ui/card'

export default function ProductDetail() {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0)
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Nguyen Van A',
      rating: 5,
      comment: 'Sản phẩm đẹp, giao hàng nhanh chóng, rất hài lòng!',
      date: '15/03/2025'
    },
    {
      id: 2,
      user: 'Tran Thi B',
      rating: 4,
      comment: 'Gói quà đẹp mắt, nhưng giao hàng hơi chậm.',
      date: '14/03/2025'
    }
  ])
  const [newComment, setNewComment] = useState({ name: '', rating: 5, comment: '', date: '' })
  const [showForm, setShowForm] = useState(false)

  const product = {
    name: 'Hộp quà Tết Phúc Lộc Thọ Toàn HPH211',
    rating: 5.0,
    reviews: 15,
    sold: 58,
    originalPrice: '859,000 đ',
    discountedPrice: '700,000 đ',
    description: [
      'Bộ Hộp quà carton ép kim cao cấp, vàng Tùy Chỉ',
      '01 Chai rượu vang đỏ Ý Vic Molino 750ml 13,5%',
      '01 Hũ Nhung MY Suy Seafood 300g',
      '01 Hũ Mứt CC Nứt Suy Seafood 250g',
      '01 Hộp Chocolate Hũ Nứt Nutelle Lale 160g',
      'Tặng thiệp chúc Tết mỹ miều của Happybox'
    ],
    mainImage: './images/slide.jpeg',
    thumbnails: ['./images/slide.jpeg', './images/slide.jpeg', './images/slide.jpeg', './images/slide.jpeg'],
    promotions: [
      {
        code: 'HAPPY200',
        discount: 'GIẢM 200K CHO ĐƠN HÀNG TỪ 4,500,000Đ',
        condition: 'Khuyến mãi sử dụng từ 05 phần trở lên tại Chi Nhánh'
      },
      {
        code: 'HAP',
        discount: 'GIẢM 100K CHO ĐƠN HÀNG',
        condition: 'Sao chép mã'
      }
    ],
    contact: {
      phone: '0967892186 (Zalo)',
      payment: 'ĐẶT MUA GIAO TẬN NƠI (THANH TOÁN KHI NHẬN HÀNG)'
    },
    shipping: 'Giao hàng siêu tốc trong 2-3h',
    condition: 'Chỉ khu vực có sẵn số lượng trên 05 phần',
    store: 'Cửa hàng: 14/4A Bàu Bàng, P. 13, Q. Tân Bình, TP.HCM',
    addToCartCode: 'HAPPY200'
  }

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

  const relatedProducts = [
    {
      id: 1,
      name: 'Hộp quà Tết Phúc Lộc Thọ HPH212',
      price: '800,000 đ',
      image: './images/related1.jpeg'
    },
    {
      id: 2,
      name: 'Hộp quà Tết Sang Trọng HPH213',
      price: '950,000 đ',
      image: './images/related2.jpeg'
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

  const navigatePromo = (direction: any) => {
    if (direction === 'prev') {
      setCurrentPromoIndex((prevIndex) => (prevIndex === 0 ? promoData.length - 1 : prevIndex - 1))
    } else {
      setCurrentPromoIndex((prevIndex) => (prevIndex === promoData.length - 1 ? 0 : prevIndex + 1))
    }
  }

  const copyCode = (code: any) => {
    navigator.clipboard.writeText(code)
    alert(`Mã ${code} đã được sao chép!`)
  }

  const handleCommentSubmit = (e: any) => {
    e.preventDefault()
    const currentDate = new Date().toLocaleDateString('vi-VN')
    const newCommentEntry = {
      id: comments.length + 1,
      user: newComment.name,
      comment: newComment.comment,
      date: currentDate
    }
    setNewComment({ name: '', rating: 5, comment: '', date: currentDate })
    setShowForm(false) // Hide form after submission
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setNewComment((prev) => ({ ...prev, [name]: value }))
  }

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
                <img src={product.mainImage} alt={product.name} className='w-full rounded-lg' />
                <span className='absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm'>SALE</span>
              </div>
              {/* Thumbnail Images */}
              <div className='flex gap-2 mt-4'>
                {product.thumbnails.map((thumbnail, index) => (
                  <img
                    key={index}
                    src={thumbnail}
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
                  <span>{product.shipping}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-10a1 1 0 00-1 1v3a1 1 0 002 0V7a1 1 0 00-1-1z' />
                  </svg>
                  <span>{product.condition}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-10a1 1 0 00-1 1v3a1 1 0 002 0V7a1 1 0 00-1-1z' />
                  </svg>
                  <span>{product.store}</span>
                </div>
              </div>
              <button className='mt-2 text-red-500 underline'>Xem VIDEO</button>
            </div>

            {/* Right Section: Product Details */}
            <div className='lg:w-1/2'>
              {/* Product Name */}
              <h1 className='text-2xl font-bold text-gray-800'>{product.name}</h1>

              {/* Rating and Sold */}
              <div className='flex items-center gap-2 mt-2'>
                <div className='flex text-yellow-400'></div>
                <span className='text-gray-600'>
                  {product.rating} ({product.reviews} đánh giá)
                </span>
                <span className='text-gray-600'>Đã bán {product.sold}</span>
              </div>

              {/* Price and Discount */}
              <div className='mt-4'>
                <span className='text-gray-500 line-through'>{product.originalPrice}</span>
                <span className='text-red-500 text-2xl font-bold ml-2'>{product.discountedPrice}</span>
              </div>

              {/* Product Description */}
              <ul className='mt-4 text-gray-700 list-disc list-inside'>
                {product.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {/* Discount Banners */}
              <div className='mt-4'>
                <div className='flex flex-row justify-center items-center gap-2'>
                  {/* Previous button */}
                  <button
                    onClick={() => navigatePromo('prev')}
                    className='bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-300'
                  >
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
                        <button
                          className='bg-orange-500 text-white py-1 px-3 rounded-full text-sm'
                          onClick={() => copyCode(promoData[currentPromoIndex].code)}
                        >
                          Sao chép mã
                        </button>
                        <a href='#' className='text-blue-500 text-xs'>
                          Điều kiện
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Next button */}
                  <button
                    onClick={() => navigatePromo('next')}
                    className='bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-300'
                  >
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
                  <span className='text-white font-bold'>{product.contact.phone}</span>
                </div>
                <div className='flex-1 flex justify-center w-[95%] bg-orange-500 gap-3 items-center px-4 py-3 rounded-full border border-gray-300'>
                  <span className='text-white'>{product.contact.payment}</span>
                </div>
              </div>

              {/* Additional Info Styled Section */}
              <Card className='bg-[#fdf7ec] mt-4 border border-gray-300 p-4 rounded-lg text-gray-700 text-sm'>
                <CardContent>
                  <div className='space-y-4'>
                    {/* In ấn logo thương hiệu */}
                    <div className='flex items-start space-x-2'>
                      <Package className='text-yellow-600' size={20} />
                      <div>
                        <p className='font-semibold'>In ấn logo thương hiệu</p>
                        <p>
                          In ấn, gia công logo theo thương hiệu riêng của khách hàng trên hộp quà với số lượng từ 10
                          phần trở lên
                          <span className='text-red-500 font-semibold'> Theo bảng giá</span>
                        </p>
                      </div>
                    </div>

                    {/* Hỗ trợ giao hàng từng điểm */}
                    <div className='flex items-start space-x-2'>
                      <Truck className='text-yellow-600' size={20} />
                      <div>
                        <p className='font-semibold'>Hỗ trợ giao hàng từng điểm</p>
                        <p>
                          Với những đơn hàng đặt số lượng và giao nhiều nơi, Happybox có dịch vụ giao hàng từng địa điểm
                          / tận tay khách hàng trên toàn quốc (Có tính phí)
                        </p>
                        <p>
                          (Vui lòng liên hệ
                          <span className='text-red-500 font-semibold'> 0906 330 360</span> để biết thêm chi tiết về gói
                          dịch vụ)
                        </p>
                      </div>
                    </div>

                    {/* Chính sách giao hàng */}
                    <div className='flex items-start space-x-2'>
                      <Truck className='text-yellow-600' size={20} />
                      <div>
                        <p className='font-semibold'>Chính sách giao hàng</p>
                        <p className='font-medium'>Đơn dưới 5 phần</p>
                        <ul className='list-disc list-inside'>
                          <li>
                            <span className='font-semibold'>Hỏa tốc</span>: Tp HCM, Hà Nội, Cần Thơ -{' '}
                            <span className='font-semibold'>1-4h</span> (Theo App giao hàng)
                          </li>
                          <li>
                            <span className='font-semibold'>Giao nhanh</span>: Tp HCM, Hà Nội, Cần Thơ -{' '}
                            <span className='font-semibold'>1-2 ngày</span> (40,000đ)
                          </li>
                          <li>
                            <span className='font-semibold'>Các tỉnh thành khác</span>:{' '}
                            <span className='font-semibold'>3-5 ngày</span> (40,000đ)
                          </li>
                        </ul>
                        <p className='text-green-600 font-semibold'>
                          Miễn phí Giao nhanh cho những đơn hàng trên 1,000,000đ
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Product Reviews Section */}
          <div className='mt-8'>
            <h2 className='text-xl font-bold text-gray-800'>Đánh Giá Sản Phẩm</h2>
            {comments.length > 0 ? (
              <div className='mt-4'>
                {comments.map((comment) => (
                  <div key={comment.id} className='mb-4 p-4 border rounded-lg'>
                    <div className='flex items-center gap-2'>
                      <span className='font-semibold'>{comment.user}</span>
                      <div className='flex text-yellow-400'></div>
                    </div>
                    <p className='text-gray-600 mt-2'>{comment.comment}</p>
                    <p className='text-gray-500 text-sm mt-1'>{comment.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-600 mt-2'>Chưa có đánh giá nào.</p>
            )}
            <button
              className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-full'
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Ẩn Form Đánh Giá' : 'Viết Đánh Giá'}
            </button>
            {showForm && (
              <form onSubmit={handleCommentSubmit} className='mt-4 p-4 border rounded-lg'>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Họ và Tên</label>
                  <input
                    type='text'
                    name='name'
                    value={newComment.name}
                    onChange={handleInputChange}
                    className='w-full p-2 border rounded-lg'
                    required
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Đánh Giá (1-5)</label>
                  <select
                    name='rating'
                    value={newComment.rating}
                    onChange={handleInputChange}
                    className='w-full p-2 border rounded-lg'
                    required
                  >
                    {[1, 2, 3, 4, 5].map((rate) => (
                      <option key={rate} value={rate}>
                        {rate}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Nhận xét</label>
                  <textarea
                    name='comment'
                    value={newComment.comment}
                    onChange={handleInputChange}
                    className='w-full p-2 border rounded-lg'
                    required
                  />
                </div>
                <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded-full'>
                  Gửi Đánh Giá
                </button>
              </form>
            )}
          </div>

          {/* Related Products Section */}
          <div className='mt-8'>
            <h2 className='text-xl font-bold text-gray-800'>Sản Phẩm Liên Quan</h2>
            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
              {relatedProducts.map((product) => (
                <div key={product.id} className='border rounded-lg p-4'>
                  <img src={product.image} alt={product.name} className='w-full h-32 object-cover rounded-lg' />
                  <h3 className='text-lg font-semibold mt-2'>{product.name}</h3>
                  <p className='text-red-500 font-bold mt-1'>{product.price}</p>
                  <button className='mt-2 bg-red-500 text-white px-4 py-2 rounded-full'>Xem Chi Tiết</button>
                </div>
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
