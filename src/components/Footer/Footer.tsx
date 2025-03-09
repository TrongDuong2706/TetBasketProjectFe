import React from 'react';

const LuxyStorePage: React.FC = () => {
  return (
    <div className="p-4" style={{ 
      fontFamily: 'Roboto, sans-serif',
      backgroundColor: '#fdf7ec',
      color: '#4a4a4a' 
    }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src="public/images/logo_luxy.jpg"
              alt="Luxy Store logo"
              width={100}
              height={100}
              className="mr-4"
            />
            <div>
              <h1 className="text-3xl font-bold">LUXY STORE</h1>
              <p className="text-sm">Tinh hoa quà Việt</p>
            </div>
          </div>
        </div>

        {/* Flex container for the sections */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          {/* QUY ĐỊNH Section */}
          <div className="flex-1">
            <h2 className="font-bold mb-4">QUY ĐỊNH</h2>
            <ul className="space-y-2">
              <li>Giới thiệu</li>
              <li>Liên hệ</li>
              <li>Quà tết blog</li>
              <li>Chính sách bảo mật</li>
              <li>Điều khoản điều kiện</li>
              <li>Chính sách vận chuyển</li>
              <li>Chính sách đổi trả</li>
              <li>Bảo hành sản phẩm</li>
              <li>Giải quyết khiếu nại</li>
              <li>Hướng dẫn mua hàng</li>
              <li>Các câu hỏi &amp; Giải đáp</li>
            </ul>
          </div>

          {/* SẢN PHẨM Section */}
          <div className="flex-1">
            <h2 className="font-bold mb-4">SẢN PHẨM</h2>
            <ul className="space-y-2">
              <li>Quà Tết</li>
              <li>Hộp quà tết</li>
              <li>Giỏ quà tết</li>
              <li>Quà tết doanh nghiệp</li>
              <li>Quà tết Nhập khẩu</li>
            </ul>
          </div>

          {/* VỀ LUXY STORE Section */}
          <div className="flex-1">
            <h2 className="font-bold mb-4">VỀ LUXY STORE</h2>
            <p className="mb-4">
              Luxy Store là thương hiệu quà tặng cao cấp. Với kinh nghiệm nhiều năm trong lĩnh vực quà Tết, chúng tôi tự tin mang lại cho khách hàng những món quà ý nghĩa, sang trọng, đẳng cấp với chất lượng và dịch vụ tốt nhất.
            </p>
            <p>Địa chỉ: 90 Vọng Hà, Quận Hoàn Kiếm, Hà Nội</p>
            <p>Phone: 091 6855524 - 039 7793333 - 096 7892186</p>
            <p>Email: info@hcentury.vn - info@luxystore.vn</p>
            <p>Góp ý &amp; Khiếu nại: 096 789 21 86</p>
            <p>Giao Hàng Toàn Quốc</p>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="font-bold text-lg">QUÀ TẾT CAO CẤP LUXY STORE</h2>
          <p className="mt-4">
            Tặng quà Tết là một trong những văn hoá truyền thống của người Việt Nam mỗi dịp Tết đến Xuân về. Cùng đón tiếp một mùa Xuân mới đang gõ cửa từng nhà, người người háo hức đón chờ từng giây phút thiêng liêng của thời khắc giao thừa, gửi đi những lời chúc tốt đẹp, gửi đi những món quà ý nghĩa. Tết có nhiều loại quà, từ những món quà đơn giản, bình dị đến những món quà sang trọng, đẳng cấp. Luxy Store không chỉ là món quà, mà còn là sự gắn kết tình thân, là những giá trị nhân văn, là những món quà Tết hạnh phúc mà chúng tôi muốn gửi đến bạn. Luxy Store không bán rượu cho người dưới 18 tuổi.
          </p>
        </div>

        <div className="text-center text-sm">
          <p>© 2025 Luxy Store. All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default LuxyStorePage;
