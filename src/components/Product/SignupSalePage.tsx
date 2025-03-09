import React from 'react';

const SignupSalePage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
      {/* Product Box 1 */}
      <div className="relative bg-red-900 text-white p-6 rounded-lg flex flex-col items-center text-center">
        <img
          alt="High-quality Tet gift box with various items including wine and snacks"
          className="mb-4 rounded-lg w-full h-48 object-cover"
          src="https://storage.googleapis.com/a1aa/image/o6mJEfspH1VrkX5KSoBqaxZchfwwYgfNcHIaZwq1f2c.jpg"
        />
        <div className="absolute inset-0 bg-red-900 bg-opacity-50 flex flex-col items-center justify-center p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">HỘP QUÀ TẾT CAO CẤP</h2>
          <p>Mẫu mã sang trọng, sản phẩm chất lượng, đa dạng lựa chọn, giao hàng cực nhanh...</p>
        </div>
      </div>

      {/* Product Box 2 */}
      <div
        className="bg-cover bg-center text-white p-6 rounded-lg flex flex-col items-center text-center md:col-span-1 md:row-span-2 justify-center"
        style={{ backgroundImage: 'url("/images/background.png")' }}
      >
        <h2 className="text-xl font-bold mb-2">Đăng ký nhận bản tin</h2>
        <p className="mb-4">HAPPYBOX THƯƠNG HIỆU QUÀ TẶNG LỄ, TẾT, SỰ KIỆN UY TÍN</p>
        <p className="mb-4">Nhập thông tin của bạn để nhận những bản tin, khuyến mãi từ chúng tôi</p>
        <input
  className="p-2 mb-4 text-white bg-transparent focus:outline-none border-b-2 border-white placeholder-white text-center w-full" // Căn giữa chữ và làm gạch ngang dài
  placeholder="Nhập email của bạn"
  type="email"
/>
<button className="bg-[#f0c494] text-gray hover:text-black px-12 py-2 rounded-full w-40">
  SIGN UP
</button>
      </div>

      {/* Product Box 3 */}
      <div className="relative bg-red-900 text-white p-6 rounded-lg flex flex-col items-center text-center">
        <img
          alt="High-quality Tet gift basket with various items"
          className="mb-4 rounded-lg w-full h-48 object-cover"
          src="https://storage.googleapis.com/a1aa/image/_2bPJjuU_aI-mO0FWDiuHpegDAbsEccQjGiTOaBZxE8.jpg"
        />
        <div className="absolute inset-0 bg-red-900 bg-opacity-50 flex flex-col items-center justify-center p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">GIỎ QUÀ TẾT CAO CẤP</h2>
          <p>
            Giỏ quà tết cao cấp Happybox đa dạng mẫu mã, chất lượng cao cấp, gói riêng theo yêu cầu
          </p>
        </div>
      </div>

      {/* Product Box 4 */}
      <div className="relative bg-red-900 text-white p-6 rounded-lg flex flex-col items-center text-center">
        <img
          alt="Corporate Tet gift box with various items"
          className="mb-4 rounded-lg w-full h-48 object-cover"
          src="https://storage.googleapis.com/a1aa/image/qj_UkzbHN62A70WnqSgXTztyfgd6jGMVpfOAYENt4DQ.jpg"
        />
        <div className="absolute inset-0 bg-red-900 bg-opacity-50 flex flex-col items-center justify-center p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">QUÀ TẾT DOANH NGHIỆP</h2>
          <p>Đa dạng mẫu mã, in logo doanh nghiệp theo yêu cầu, Chiết khấu cao. Giao hàng nhanh</p>
        </div>
      </div>

      {/* Product Box 5 */}
      <div className="relative bg-red-900 text-white p-6 rounded-lg flex flex-col items-center text-center">
        <img
          alt="Employee Tet gift box with various items"
          className="mb-4 rounded-lg w-full h-48 object-cover"
          src="https://storage.googleapis.com/a1aa/image/ztSNK-bpUoZASSGPacWRGbBkvnLUsnwUfvXxsVkSukE.jpg"
        />
        <div className="absolute inset-0 bg-red-900 bg-opacity-50 flex flex-col items-center justify-center p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">QUÀ TẾT NHÂN VIÊN</h2>
          <p>Quà Tết cho nhân viên không thể thiếu vào các dịp Lễ, Tết, Khen Thưởng</p>
        </div>
      </div>
    </div>
  );
};

export default SignupSalePage;
