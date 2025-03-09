import React from 'react';
import ProductBox from './ProductBox'; // Import ProductBox component

const FlashSalePage: React.FC = () => {
  return (
    <div className="bg-cream-light text-center py-8">
      <h2 className="text-lg font-semibold text-gray-600">KHUYẾN MÃI TỪ HAPPYBOX</h2>
      <h1 className="text-3xl font-bold text-gray-800 my-2">FLASH SALE</h1>
      <hr className="border-t-2 border-gray-300 my-4 mx-auto w-80" />  {/* Line to separate FLASH SALE and the text below */}
      <p className="text-gray-500 mb-8">
        Quà tặng Lễ, Tết và Sự kiện, quà tặng ngoại nhập và đặc sản
      </p>

      {/* Sản phẩm Flash Sale */}
      <div className="flex justify-center space-x-4">
        <ProductBox
          imageSrc="https://storage.googleapis.com/a1aa/image/nuHv3KgPvRba4fNSDvPdwgWqJB-rBFwNlGmxz_IcXxw.jpg"
          title="Hộp quà Tết cao cấp Happybox Phúc Lộc An Khang HPH111"
          originalPrice="1,750,000 ₫"
          discountPrice="1,190,000 ₫"
        />
        <ProductBox
          imageSrc="https://storage.googleapis.com/a1aa/image/PFk-gzjydnOoCqmJOrHCf3vEQD4X0R_E5pQJMgqKR5I.jpg"
          title="Hộp Quà Tết cao cấp Happybox HPH1218"
          originalPrice="860,000 ₫"
          discountPrice="680,000 ₫"
        />
      </div>

      {/* Nút tải thêm sản phẩm */}
      <button className="mt-8 bg-[#d84444] text-white text-lg font-semibold py-2 px-6 rounded-full">
        TẢI THÊM SẢN PHẨM
      </button>
    </div>
  );
};

export default FlashSalePage;
