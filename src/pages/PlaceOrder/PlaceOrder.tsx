import React from "react";
import Header from "src/components/HomeHeader/Header";
import Footer from "src/components/Footer/Footer";

import { useState } from "react";

const PlaceOrder: React.FC = () => {
    const [quantity, setQuantity] = useState(1);
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex justify-center items-start p-4">
                <div className="max-w-2xl bg-white p-6 rounded-lg shadow-md w-full">
                    <div className="border-t pt-4">
                        <h3 className="text-lg font-semibold mb-4">Thông tin thanh toán</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-gray-700">Họ và tên *</label>
                                <input className="w-full border rounded px-4 py-2" placeholder="Nhập họ và tên" type="text" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Địa chỉ email *</label>
                                <input className="w-full border rounded px-4 py-2" placeholder="Nhập địa chỉ email" type="email" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Số điện thoại *</label>
                                <input className="w-full border rounded px-4 py-2" placeholder="Nhập số điện thoại" type="text" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Địa chỉ *</label>
                                <input className="w-full border rounded px-4 py-2" placeholder="Nhập địa chỉ cụ thể" type="text" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Ghi chú đơn hàng (tuỳ chọn)</label>
                            <textarea className="w-full border rounded px-4 py-2" placeholder="Ghi chú cho đơn hàng" rows={4}></textarea>
                        </div>
                    </div>
                    <div className="border-t pt-4">
                        <div className="flex justify-between text-gray-700 mb-2">
                            <span>Tạm tính (3 sản phẩm):</span>
                            <span>2,250,000 đ</span>
                        </div>
                        <div className="flex justify-between text-gray-700 mb-2">
                            <span>Giao hàng:</span>
                            <span>30,000 đ</span>
                        </div>
                        <div className="flex justify-between text-gray-700 font-semibold mb-4">
                            <span>Tổng:</span>
                            <span>2,280,000 đ</span>
                        </div>
                    </div>
                    <div className="border-t pt-4 mb-4">
                        <h3 className="text-lg font-semibold mb-2">Trả tiền mặt khi nhận hàng</h3>
                        <p className="text-gray-700">Nhận hàng và trả tiền mặt trực tiếp cho nhân viên giao hàng</p>
                    </div>
                    <button className="bg-[#b02c24] text-white text-center py-4 rounded-lg w-full">
                        Đặt hàng
                    </button>
                </div>
                <div className="max-w-2xl bg-white p-6 rounded-lg shadow-md w-full mt-4 md:mt-0 md:ml-4 flex flex-col justify-between">
                    {[{
                        id: "HPH218",
                        name: "Hộp Quà Tết cao cấp Happybox HPH218",
                        price: "680,000 đ",
                        image: "https://storage.googleapis.com/a1aa/image/d7mbjmv72TcsvMCFZkb2rpDx9X1_EESq0s2ho7WsDWw.jpg"
                    }, {
                        id: "HPH219",
                        name: "Hộp Quà Tết cao cấp Happybox HPH219",
                        price: "750,000 đ",
                        image: "https://placehold.co/100x100"
                    }, {
                        id: "HPH220",
                        name: "Hộp Quà Tết cao cấp Happybox HPH220",
                        price: "820,000 đ",
                        image: "https://placehold.co/100x100"
                    }].map((product) => (
                        <div key={product.id} className="flex items-center border-b pb-4 mb-4">
                            <img alt={product.name} className="w-24 h-24 object-cover rounded mr-4" src={product.image} />
                            <div className="flex-1 text-right">
                                <h2 className="text-lg font-semibold">{product.name}</h2>
                                <div className="text-gray-600">{product.price}</div>
                            </div>
                            <div className="flex items-center">
                                <button className="text-gray-600 px-2">-</button>
                                <input className="w-12 text-center border rounded mx-2" type="text" value="1" readOnly />
                                <button className="text-gray-600 px-2">+</button>
                            </div>
                        </div>
                    ))}
                    <div className="mb-4">
                        <label className="flex items-center text-gray-700">
                            <i className="fas fa-ticket-alt mr-2"></i>
                            Sử dụng mã giảm giá
                        </label>
                        <div className="flex mt-2">
                            <input className="flex-1 border rounded-l px-4 py-2" placeholder="Mã ưu đãi" type="text" />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-r">Áp dụng</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default PlaceOrder;
