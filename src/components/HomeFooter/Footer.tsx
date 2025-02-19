import React from "react";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Cột 1: Logo & Mô tả */}
        <div>
          <h2 className="text-2xl font-bold">HappyBox</h2>
          <p className="mt-2 text-gray-400">Mang đến những món quà ý nghĩa cho người thân yêu.</p>
        </div>

        {/* Cột 2: Liên hệ */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Liên hệ</h3>
          <p className="flex items-center gap-2 text-gray-400">
            <Phone size={16} /> 0123 456 789
          </p>
          <p className="flex items-center gap-2 text-gray-400 mt-1">
            <Mail size={16} /> contact@happybox.vn
          </p>
          <p className="flex items-center gap-2 text-gray-400 mt-1">
            <MapPin size={16} /> 123 Đường ABC, TP. Hồ Chí Minh
          </p>
        </div>

        {/* Cột 3: Mạng xã hội */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Theo dõi chúng tôi</h3>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm">
        &copy; 2025 HappyBox. All rights reserved.
      </div>
    </footer>
  );
}
