import React, { FormEvent, useState } from 'react';

interface OrderFormData {
  name: string;
  phone: string;
  address: string;
  productType: string;
  quantity: string;
  message: string;
}

const OrderPage: React.FC = () => {
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    phone: '',
    address: '',
    productType: '',
    quantity: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log(formData);
    
    // Here you can add your form submission logic, e.g., sending data to a server
  };

  return (
    <div 
      className="text-white" 
      style={{ 
        fontFamily: 'Arial, sans-serif', 
        backgroundImage: 'url(/images/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto p-4">
        <div className="text-center mb-4">
          <img 
            src="https://happybox.vn/wp-content/uploads/2022/12/muahang.png" 
            alt="Mua hàng với số lượng lớn, Đặt hàng ngay" 
            className="mx-auto"
          />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1">
            <img 
              src="https://storage.googleapis.com/a1aa/image/r6I_-nY5FpXutXUNH7wwQz-OR1y65G_ur0edwe87Ct8.jpg" 
              alt="Various gift boxes and products" 
              width={600}
              height={400}
              className="mx-auto"
            />
          </div>
          <div className="flex-1 p-8 rounded-lg">
            <div className="text-center mb-4">
              <img 
                src="https://happybox.vn/wp-content/uploads/2022/12/dat-ngay.png" 
                alt="Đặt mua hôm nay, Nhận ngay ưu đãi" 
                className="mx-auto"
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input 
                  className="p-2 rounded-lg text-black" 
                  placeholder="Họ tên" 
                  type="text" 
                  id="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input 
                  className="p-2 rounded-lg text-black" 
                  placeholder="Số điện thoại" 
                  type="text" 
                  id="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <input 
                  className="p-2 rounded-lg text-black col-span-2" 
                  placeholder="Địa chỉ" 
                  type="text" 
                  id="address" 
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <select 
                  className="p-2 rounded-lg text-black col-span-2" 
                  id="productType" 
                  value={formData.productType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Loại sản phẩm cần đặt</option>
                  <option value="Product 1">Product 1</option>
                  <option value="Product 2">Product 2</option>
                </select>
                <input 
                  className="p-2 rounded-lg text-black" 
                  placeholder="Số lượng" 
                  type="number" 
                  id="quantity" 
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <textarea 
                className="p-2 rounded-lg text-black w-full mb-4" 
                placeholder="Lời nhắn" 
                id="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              <button 
                className="bg-yellow-400 text-red-700 font-bold py-2 px-4 rounded-lg" 
                type="submit"
              >
                ĐẶT TƯ VẤN
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <img 
                src="https://happybox.vn/wp-content/uploads/2022/11/box.png" 
                alt="Shipping box" 
                className="mx-auto h-16 mb-2"
              />
              <h4 className="text-xl font-bold">VẬN CHUYỂN TOÀN QUỐC</h4>
              <p>Chúng tôi hỗ trợ vận chuyển trên phạm vi Toàn Quốc</p>
            </div>
            <div>
              <img 
                src="https://happybox.vn/wp-content/uploads/2022/11/24-hours.png" 
                alt="24 hours support" 
                className="mx-auto h-16 mb-2"
              />
              <h4 className="text-xl font-bold">HỖ TRỢ KHÁCH HÀNG 24/7</h4>
              <p>Luxy Store luôn hỗ trợ khách hàng 24h trong 7 ngày</p>
            </div>
            <div>
              <img 
                src="https://happybox.vn/wp-content/uploads/2022/11/hotline.png" 
                alt="Hotline" 
                className="mx-auto h-16 mb-2"
              />
              <h4 className="text-xl font-bold">HOTLINE: 096 789 21 86</h4>
              <p>Tư vấn &amp; hỗ trợ về các vấn đề sản phẩm, đặt hàng và hợp đồng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;