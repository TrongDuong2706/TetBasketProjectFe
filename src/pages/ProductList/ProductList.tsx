import React, { useState } from 'react'
import Footer from 'src/components/Footer/Footer'
import Header from 'src/components/HomeHeader/Header'

const dummyProducts = [
  { id: 1, name: 'Hộp quà Tết Happybox HPH362', price: 800000, basketType: 'Giỏ quà lớn', hasAlcohol: true, image: '/path/to/image1.jpg' },
  { id: 2, name: 'Hộp quà Tết Happybox HPH353', price: 850000, basketType: 'Giỏ quà nhỏ', hasAlcohol: false, image: '/path/to/image2.jpg' },
  { id: 3, name: 'Hộp quà Tết Happybox HPH187', price: 1050000, basketType: 'Giỏ quà lớn', hasAlcohol: true, image: '/path/to/image3.jpg' },
  { id: 4, name: 'Hộp quà Tết Happybox HPH111', price: 1190000, basketType: 'Giỏ quà nhỏ', hasAlcohol: false, image: '/path/to/image4.jpg' },
  { id: 5, name: 'Hộp quà Tết Happybox HPH111', price: 1190000, basketType: 'Giỏ quà lớn', hasAlcohol: true, image: '/path/to/image4.jpg' },
  { id: 6, name: 'Hộp quà Tết Happybox HPH111', price: 1190000, basketType: 'Giỏ quà nhỏ', hasAlcohol: false, image: '/path/to/image4.jpg' },
  { id: 7, name: 'Hộp quà Tết Happybox HPH111', price: 1190000, basketType: 'Giỏ quà lớn', hasAlcohol: true, image: '/path/to/image4.jpg' },
  { id: 8, name: 'Hộp quà Tết Happybox HPH111', price: 1190000, basketType: 'Giỏ quà nhỏ', hasAlcohol: true, image: '/path/to/image4.jpg' },
  { id: 9, name: 'Hộp quà Tết Happybox HPH111', price: 1190000, basketType: 'Giỏ quà lớn', hasAlcohol: false, image: '/path/to/image4.jpg' },
  { id: 10, name: 'Hộp quà Tết Happybox HPH111', price: 1190000, basketType: 'Giỏ quà nhỏ', hasAlcohol: true, image: '/path/to/image4.jpg' },
];

export default function ProductList() {
  const [priceRange, setPriceRange] = useState('');
  const [basketType, setBasketType] = useState('');
  const [hasAlcohol, setHasAlcohol] = useState(false);

  // Filtered products based on the selected criteria
  const filteredProducts = dummyProducts.filter(product => {
    const isPriceValid = priceRange ? product.price >= parseInt(priceRange.split('-')[0]) && product.price <= parseInt(priceRange.split('-')[1]) : true;
    const isBasketTypeValid = basketType ? product.basketType === basketType : true;
    const isAlcoholValid = hasAlcohol ? product.hasAlcohol === hasAlcohol : true;
    return isPriceValid && isBasketTypeValid && isAlcoholValid;
  });

  return (
    <>
      <Header />
      <div className='mb-5 mt-5 text-center'>
        <h2 className='text-2xl font-bold'>Quà Tết 2025 Cao Cấp</h2>
        <p className='text-sm text-gray-500'>Quà Tết đẹp, sang trọng, ý nghĩa dành cho người thân, bạn bè.</p>
      </div>
      <div className='p-5 flex flex-col items-center mx-auto max-w-screen-lg'>
        {/* Filters Section */}
        <div className='mb-5 grid grid-cols-4 gap-4 bg-gray-100 p-4 border border-gray-200 rounded-md shadow-md'>
          {/* Filter by Price */}
          <div>
            <label htmlFor='priceRange' className='block text-sm font-medium text-gray-700'>
              Giá
            </label>
            <select
              id='priceRange'
              value={priceRange}
              onChange={e => setPriceRange(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
            >
              <option value=''>Lọc theo giá</option>
              <option value='0-500000'>Nhỏ hơn 500k</option>
              <option value='500000-1000000'>500k - 1 triệu</option>
              <option value='1000000-2000000'>1 triệu - 2 triệu</option>
              <option value='2000000-3000000'>2 triệu - 3 triệu</option>
              <option value='3000000-10000000'>Lớn hơn 3 triệu</option>
            </select>
          </div>

          {/* Filter by Basket Type */}
          <div>
            <label htmlFor='basketType' className='block text-sm font-medium text-gray-700'>
              Thể loại giỏ
            </label>
            <select
              id='basketType'
              value={basketType}
              onChange={e => setBasketType(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
            >
              <option value=''>Lọc theo thể loại giỏ</option>
              <option value='Giỏ quà lớn'>Giỏ quà lớn</option>
              <option value='Giỏ quà nhỏ'>Giỏ quà nhỏ</option>
            </select>
          </div>

          {/* Filter by Alcohol */}
          <div>
            <label htmlFor='hasAlcohol' className='block text-sm font-medium text-gray-700'>
              Có rượu
            </label>
            <input
              type='checkbox'
              id='hasAlcohol'
              checked={hasAlcohol}
              onChange={() => setHasAlcohol(!hasAlcohol)}
              className='mt-1 rounded border-gray-300 focus:ring-indigo-500'
            />
            <span className='ml-2 text-lg'>Có rượu</span>
          </div>
        </div>

        {/* Product List Section */}
        <div className='mt-5 grid grid-cols-3 gap-4'>
          {filteredProducts.map(product => (
            <div key={product.id} className='border p-4 rounded-md shadow-md'>
              <img src={product.image} alt={product.name} className='w-full h-40 object-cover mb-4' />
              <h3 className='text-lg font-semibold'>{product.name}</h3>
              <p className='text-gray-500'>{product.price.toLocaleString()}₫</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
