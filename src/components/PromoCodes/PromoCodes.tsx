// PromoCodes.tsx
import React from 'react';

const PromoCodes: React.FC = () => {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Đã sao chép mã: ${code}`);
  };

  const promoData = [
    {
      code: "HAPPY200",
      description: "Giảm 200k cho đơn hàng từ 4,500,000đ",
    },
    {
      code: "HAPPY100",
      description: "Giảm 100k cho đơn hàng từ 2,500,000đ",
    },
    {
      code: "HAPPY50",
      description: "Giảm 50k cho đơn hàng từ 1,500,000đ",
    }
  ];

  return (
    <div className="bg-cream flex justify-center items-center pt-8 mt-0 max-h-screen">
      <div className="text-center max-w-6xl mx-auto px-4">
        <h1 className="text-xl font-semibold mb-2">Mã khuyến mãi dành riêng cho bạn</h1>
        <p className="text-gray-500 mb-6">Có thể áp dụng cùng chương trình flash sale hiện tại</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          {promoData.map((promo, index) => (
            <div key={index} className="flex bg-white shadow-md rounded-lg overflow-hidden w-[333px]">
              {/* Left coupon icon with jagged edge */}
              <div className="relative w-16 flex items-center justify-center border-r border-dashed border-gray-300 bg-white p-2">
                <img 
                  src="https://happybox.vn/wp-content/uploads/2022/10/coupon.png" 
                  alt="Coupon" 
                  className="w-10 h-10"
                />
                {/* Create the jagged edge effect on the right of the icon */}
                <div className="absolute right-0 top-0 bottom-0 w-[2px] h-full" 
                  style={{
                    backgroundImage: "radial-gradient(circle at -1px 6px, transparent 0, transparent 3px, white 3px, white 6px)",
                    backgroundSize: "2px 12px",
                    backgroundRepeat: "repeat-y",
                    backgroundPosition: "right center"
                  }}
                ></div>
              </div>
              
              {/* Coupon content */}
              <div className="flex-1 p-3 flex flex-col items-start">
                <h2 className="text-sm font-semibold mb-1">NHẬP MÃ: {promo.code}</h2>
                <p className="text-xs text-gray-500 mb-3">{promo.description}</p>
                <div className="flex justify-between w-full items-end">
                  <button 
                    className="bg-orange-500 text-white py-1 px-3 rounded-full text-sm"
                    onClick={() => copyCode(promo.code)}
                  >
                    Sao chép mã
                  </button>
                  <a href="#" className="text-blue-500 text-xs">Điều kiện</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromoCodes;