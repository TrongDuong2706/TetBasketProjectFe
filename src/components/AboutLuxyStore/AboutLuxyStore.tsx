import React from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Phone,
  Gift,
  Home,
  Info,
  Newspaper,
  Book,
  PhoneCall,
  ChevronDown,
  Box,
  Fish
} from 'lucide-react';

const AboutLuxyStore = () => {
  return (
    <div>
      {/* Header */}
      <header className='bg-[#8B1E15] text-white'>
        {/* Thanh trên cùng */}
        <div className='max-w-6xl mx-2 flex justify-between items-center px-6 py-2 text-xs gap-10'>
          {/* Slogan */}
          <span className='font-medium tracking-wide text-yellow-200'>
            Tết đủ đầy, quà tinh tế - Luxy Store trao tay!
          </span>

          {/* Số điện thoại */}
          <div className='flex items-center gap-2'>
            <PhoneCall size={14} className='text-yellow-300' />
            <span className='font-semibold'>0967 892 186</span>
          </div>
        </div>

        {/* Logo + Tìm kiếm + Giỏ hàng */}
        <div className='flex justify-center items-center px-6 py-2 bg-[#A92D22]'>
          {/* Logo */}
          <img src='/public/images/logo_luxy.jpg' alt='Luxy Store' className='w-14' />

          {/* Ô tìm kiếm */}
          <div className='mx-4 w-[50%]'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Tìm kiếm sản phẩm'
                className='w-full py-1 pl-4 pr-8 rounded bg-[#F5E1C0] text-black text-sm focus:outline-none focus:ring-0'
              />
              <Search className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600' size={16} />
            </div>
          </div>

          {/* Yêu thích + Giỏ hàng */}
          <div className='flex items-center gap-4'>
            <div className='relative flex items-center'>
              <Heart size={14} />
              <span className='absolute -top-1 -right-2 bg-red-600 text-xs px-1 rounded-full'>0</span>
            </div>
            <div className='relative flex items-center'>
              <ShoppingBag size={14} />
              <span className='ml-1 text-sm'>0 / 0₫</span>
            </div>
          </div>
        </div>

        {/* Menu điều hướng */}
        <nav className='bg-[#A92D22] py-2 flex justify-center gap-10'>
          <button className='bg-[#D73E29] font-semibold text-xs px-7 py-1 rounded flex items-center gap-1'>
            <span className='flex items-center gap-1'>
              <Gift size={14} />
              DANH MỤC
            </span>
            <span>
              <ChevronDown size={12} />
            </span>
          </button>
          <div className='flex justify-center gap-4 text-xs font-semibold'>
            <a href='#' className='flex items-center gap-1 hover:text-yellow-200'>
              <Home size={14} /> TRANG CHỦ
            </a>
            <a href='#' className='flex items-center gap-1 hover:text-yellow-200'>
              <Gift size={14} /> QUÀ TẾT
            </a>
            <a href='/about-luxystore' className='flex items-center gap-1 hover:text-yellow-200'>
              <Info size={14} /> GIỚI THIỆU
            </a>
            <a href='#' className='flex items-center gap-1 hover:text-yellow-200'>
              <Newspaper size={14} /> BLOG
            </a>
            <a href='#' className='flex items-center gap-1 hover:text-yellow-200'>
              <Phone size={14} /> LIÊN HỆ
            </a>
          </div>
          <button className='bg-[#F5E1C0] text-xs font-semibold text-black px-3 py-1 rounded flex items-center gap-1'>
            <Book size={14} /> CATALOGUE
          </button>
        </nav>
      </header>

      {/* Nội dung Giới thiệu */}
      <div className="max-w-6xl mx-auto p-6 text-center mt-12"> {/* Tăng margin-top ở đây */}
        {/* Phần giới thiệu về Luxy Store */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Hình ảnh */}
          <div className="w-full md:w-1/2">
            <img
              src="https://happybox.vn/wp-content/uploads/2023/12/tetgiadinh-1.png"
              alt="Giới thiệu Luxy Store"
              className="w-full h-auto rounded-lg"
            />
          </div>

          {/* Nội dung mô tả */}
          <div className="w-full md:w-1/2 text-left">
            <p className="text-lg mt-4">
              Happybox là thương hiệu quà tặng thuộc sở hữu của công ty Cổ Phần Happy Century. Happybox chuyên sáng tạo và cung cấp những món quà Sang Trọng Và Đẳng Cấp dành cho các cá nhân và Doanh nghiệp trong các dịp Lễ Tết và các sự kiện thường ngày.
            </p>
            <p className="text-lg mt-4">
              Bộ sưu tập quà Tết của Happybox được nghiên cứu và phát triển liên tục bởi các chuyên gia kinh nghiệm trong ngành, luôn đảm bảo những sản phẩm thơm ngon, bổ dưỡng và an toàn cho sức khoẻ của mọi người.
              Các sản phẩm nhập khẩu cao cấp, phù hợp với nhu cầu của khách hàng.
              Happybox cam kết giao hàng đúng mẫu mã, đúng số lượng, đúng chất lượng, đúng địa điểm và đúng thời gian.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 text-center mt-12">
  {/* Các ô sản phẩm */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-8">
    <div className="bg-[#F5E1C0] text-center p-3 rounded-lg hover:bg-[#af1e23] transition-colors duration-300">
      <Gift size={20} className="mx-auto mb-2" />
      <span className="font-semibold text-sm">Quà Tết</span>
    </div>
    <div className="bg-[#F5E1C0] text-center p-3 rounded-lg hover:bg-[#af1e23] transition-colors duration-300">
      <Box size={20} className="mx-auto mb-2" />
      <span className="font-semibold text-sm">Hộp quà Tết</span>
    </div>
    <div className="bg-[#F5E1C0] text-center p-3 rounded-lg hover:bg-[#af1e23] transition-colors duration-300">
      <ShoppingBag size={20} className="mx-auto mb-2" />
      <span className="font-semibold text-sm">Giỏ quà Tết</span>
    </div>
    <div className="bg-[#F5E1C0] text-center p-3 rounded-lg hover:bg-[#af1e23] transition-colors duration-300">
      <Heart size={20} className="mx-auto mb-2" />
      <span className="font-semibold text-sm">Quà sức khỏe</span>
    </div>
    <div className="bg-[#F5E1C0] text-center p-3 rounded-lg hover:bg-[#af1e23] transition-colors duration-300">
      <Fish size={20} className="mx-auto mb-2" />
      <span className="font-semibold text-sm">Yến sào</span>
    </div>
    <div className="bg-[#F5E1C0] text-center p-3 rounded-lg hover:bg-[#af1e23] transition-colors duration-300">
      <Fish size={20} className="mx-auto mb-2" />
      <span className="font-semibold text-sm">Đông trùng hạ thảo</span>
    </div>
  </div>
</div>

{/* Phần Tầm Nhìn (thay bằng hình ảnh) */}
<div className="max-w-6xl mx-auto p-2 text-left mt-0"> {/* Giảm margin-top */}
  <img
    src="https://happybox.vn/wp-content/uploads/2023/12/sm_03.png" // Thay đường dẫn ảnh phù hợp
    alt="Tầm Nhìn"
    className="w-full h-auto mt-0 rounded-lg"
  />
</div>

{/* Phần Tầm Nhìn văn bản */}
<div className="max-w-6xl mx-auto p-2 text-left mt-0"> {/* Giảm margin-top */}
  <p className="text-lg mb-4 pl-8 pr-8"> {/* Thêm padding-left và padding-right */}
    Chúng tôi hướng đến việc trở thành điểm đến hàng đầu cho những trải nghiệm quà tặng thanh lịch và ý nghĩa nhất với đa dạng mẫu mã theo từng chủ đề và ngành nghề. Tại Happybox, mỗi sản phẩm phải mang đầy đủ ý nghĩa, nơi mà mỗi phần quà là một câu chuyện riêng biệt.
  </p>
  <p className="text-lg mb-4 pl-8 pr-8"> {/* Thêm padding-left và padding-right */}
    Sản phẩm quà tặng Happybox với hàng trăm mẫu mã sản phẩm mới và hàng trăm ngàn phần quà đã được trao đến tận tay từng người được tặng đều đặn mỗi năm.
  </p>
</div>

{/* Phần Sứ Mệnh (thay bằng hình ảnh) */}
<div className="max-w-6xl mx-auto p-2 text-left mt-0"> {/* Giảm margin-top */}
  <img
    src="https://happybox.vn/wp-content/uploads/2023/12/sm_06.png" // Thay đường dẫn ảnh phù hợp
    alt="Sứ Mệnh"
    className="w-full h-auto mt-0 rounded-lg"
  />
</div>

{/* Phần Sứ Mệnh văn bản */}
<div className="max-w-6xl mx-auto p-2 text-left mt-0"> {/* Giảm margin-top */}
  <p className="text-lg mb-4 pl-8 pr-8"> {/* Thêm padding-left và padding-right */}
    Sứ mệnh của Happybox là nối kết tinh giữa xu hướng hiện đại và những giá trị tinh hoa truyền thống của Việt Nam qua những món quà tặng cao cấp và ý nghĩa.
  </p>
  <p className="text-lg mb-4 pl-8 pr-8"> {/* Thêm padding-left và padding-right */}
    Happybox tạo ra những sản phẩm quà tặng không chỉ là biểu tượng của sự sang trọng và chất lượng, mà còn là ngôn ngữ của tình yêu thương và tri ân. Happybox tin rằng mỗi món quà đều có thể làm cho mỗi dịp biểu tượng trở nên đặc biệt hơn với nhiều ý niệm và giá trị. Từ đó, mang đến những giá trị tinh cảm tham giao, gắn kết giữa người với người, giữa doanh nghiệp và doanh nghiệp, giữa tổ chức và tổ chức và giao thoa tất cả với nhau thành một khối.
  </p>
</div>

<div className="max-w-6xl mx-auto p-2 text-left mt-0"> {/* Giảm margin-top */}
  <img
    src="https://happybox.vn/wp-content/uploads/2023/12/ketnoi.png" // Thay đường dẫn ảnh phù hợp
    alt="Sứ Mệnh"
    className="w-full h-auto mt-0 rounded-lg"
  />
</div>

{/* Phần Giá trị cốt lõi */}
<div className="max-w-6xl mx-auto p-6 mt-12">
  <h2 className="text-2xl font-bold text-black-700 mb-6">GIÁ TRỊ CỐT LÕI</h2>
  <p className="text-sm text-gray-700 mb-4">Happybox gửi gắm trong từng phần quà tặng trao đến tay đến Người nhận mang đầy đủ sự TẬN TÂM - TẬN TINH - TẬN TUY.</p>

  {/* Các box Tận Tâm, Tận Tinh, Tận Tuy */}
  <div className="space-y-4">
    <div className="bg-[#af1e23] text-white p-4 rounded-lg">
      <h3 className="font-semibold text-xl">Tận Tâm</h3>
      <p className="text-sm mt-2">Chúng tôi đặt trái tim của mình vào từng sản phẩm, để mỗi hộp quà mang đến trải nghiệm tận tâm và chân thành nhất.</p>
    </div>
    <div className="bg-[#af1e23] text-white p-4 rounded-lg">
      <h3 className="font-semibold text-xl">Tận Tinh</h3>
      <p className="text-sm mt-2">Sự chăm sóc và tận tinh được đặt vào từng đường nét, từng chi tiết của sản phẩm, để tạo ra những món quà không chỉ đẹp mắt mà còn đậm chất tinh cảm.</p>
    </div>
    <div className="bg-[#af1e23] text-white p-4 rounded-lg">
      <h3 className="font-semibold text-xl">Tận Tuy</h3>
      <p className="text-sm mt-2">Trong việc nghiên cứu, phát triển sản phẩm để đảm bảo chúng luôn đáp ứng đúng nhu cầu và mong đợi của khách hàng.</p>
    </div>
  </div>
</div>
{/* Phần Lịch sử phát triển */}
<div className="max-w-6xl mx-auto p-0 mt-12">
  <h2 className="text-2xl font-bold text-red-700 mb-6">LỊCH SỬ PHÁT TRIỂN</h2>
  <p className="text-lg mb-4">Happybox là thương hiệu Quà tặng Cao cấp và Chuyên nghiệp được khởi nghiệp từ 2019 sau khoảng thời gian cung cấp quà tặng với nhiều suy tư trân trọng đối ngũ sáng lập từ nhu cầu của Khách hàng.</p>
  <p className="text-lg mb-4">Quá trình phát triển, từ cửa hàng chuyên về quà tặng đến CÔNG TY TNHH SMART UP FINITY và đến năm 2022 sau cổ phần hóa là CÔNG TY CỔ PHẦN HAPPY CENTURY. Hệ thống thương hiệu của chúng tôi hiện nay bao gồm:</p>

  <ul className="list-disc pl-8 text-lg">
    <li>HAPPYBOX - Quà tặng & Quà tặng Cao cấp, chuyên nghiệp</li>
    <li>VANG TỐT - Rượu vang & Thức uống cho sức khỏe</li>
    <li>ANGIFT - Quà tặng Sức khỏe</li>
    <li>ANEST - Yến sào thương hạng</li>
    <li>SUFOODS - Thực phẩm dinh dưỡng & Hữu cơ</li>
  </ul>

  <p className="text-lg mt-4">Hiện nay, hệ thống của chúng tôi đã trải dài trên hầu hết các tỉnh thành với hơn 50 Đại lý phân phối và 3 Chi nhánh chính tại TP.HCM, Thủ đô Hà nội và TP. Cần Thơ.</p>
</div>
<div className="max-w-6xl mx-auto p-2 text-left mt-0"> {/* Giảm margin-top */}
  <img
    src="https://happybox.vn/wp-content/uploads/2024/11/lichsu-happybox.jpg"
    alt="Sứ Mệnh"
    className="w-full h-auto mt-0 rounded-lg"
  />
</div>
<div className="max-w-6xl mx-auto p-2 text-center mt-0"> {/* Căn giữa text và div */}
  <p className="text-4xl mb-4 mx-auto font-semibold"> {/* Căn giữa và dùng text-xl */}
    Khách hàng & Đối tác của Happybox
  </p>
  <p className="text-lg mb-4 mx-auto">
    Với 05 năm hoạt động và hơn 150.000+ Khách hàng đã tin tưởng sử dụng quà tặng và dịch vụ tại Happybox, hãy cùng chúng tôi lắng nghe câu chuyện trải nghiệm và giá trị Khách hàng. Rất nhiều câu chuyện tình cảm đã được chia sẻ, hãy cùng Happybox cảm nhận nhé!
  </p>
</div>
<div className="max-w-6xl mx-auto p-6 text-center mt-12">
  <h2 className="text-2xl font-bold text-red-700 mb-6"></h2>
  <div className="grid grid-cols-2 gap-6">
    <div className="flex justify-center items-center">
      <img src="https://happybox.vn/wp-content/uploads/2023/12/kh-Taichinh-nganhang-1.png" alt="Vietcombank" className="max-w-lg h-auto" />
    </div>
    <div className="flex justify-center items-center">
      <img src="https://happybox.vn/wp-content/uploads/2023/12/kh-banle.png" alt="MB" className="max-w-lg h-auto" />
    </div>
    <div className="flex justify-center items-center">
      <img src="https://happybox.vn/wp-content/uploads/2023/12/Kh-Yte-giaoduc-1.png" alt="MB" className="max-w-lg h-auto" />
    </div>
    <div className="flex justify-center items-center">
      <img src="https://happybox.vn/wp-content/uploads/2023/12/Kh-Batdongsan.png" alt="MB" className="max-w-lg h-auto" />
    </div>
    <div className="flex justify-center items-center">
      <img src="https://happybox.vn/wp-content/uploads/2023/12/Kh-vantai-1.png" alt="MB" className="max-w-lg h-auto" />
    </div>
    <div className="flex justify-center items-center">
      <img src="https://happybox.vn/wp-content/uploads/2023/12/kh-san-xuat.png" alt="MB" className="max-w-lg h-auto" />
    </div>
    <div className="flex justify-center items-center">
      <img src="https://happybox.vn/wp-content/uploads/2023/12/kh-dichvu.png" alt="MB" className="max-w-lg h-auto" />
    </div>
    <div className="flex justify-center items-center">
      <img src="https://happybox.vn/wp-content/uploads/2023/12/kh-suckhoe-lamdep.png" alt="MB" className="max-w-lg h-auto" />
    </div>
    <div className="flex justify-center items-center">
      <img src="https://happybox.vn/wp-content/uploads/2023/12/kh-giaitri.png" alt="MB" className="max-w-lg h-auto" />
    </div>
  </div>
  <h2 className="text-2xl font-bold text-red-700 mt-12 mb-6">SIÊU THỊ & BÁN LẺ</h2>
</div>
    </div>
  );
};

export default AboutLuxyStore;
