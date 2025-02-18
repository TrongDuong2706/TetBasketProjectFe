import { Button } from "src/components/ui/Button";
import { Card, CardContent } from "src/components/ui/card";

import { ShoppingCart, Gift, Truck, ShieldCheck } from "lucide-react";
import Footer from "src/components/Footer/Footer";
import Header from "src/components/NavHeader/Header";
import IntroSlider from "src/components/Slide/IntroSlider";

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <IntroSlider />

      {/* Giới Thiệu */}
      <section className="bg-[#fff8f1] text-black py-10 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold mb-6 font-custom"> Trao gửi yêu thương </h2>
          <p className="text-4xl mb-6">Luxy Store - Quà Tặng Lễ, Tết, Sự Kiện</p>
          <p className="text-xl">Hãy để Luxy Box đồng hành cùng bạn trong việc trao gửi những món quà ý nghĩa, thể hiện sự quan tâm và kết nối tình thân với những người thân yêu, đối tác và khách hàng.</p>
          
          {/* Thay thế phần Catalogue bằng 4 nút */}
          <div className="mt-10 grid grid-cols-4 gap-4">
            <Button className="bg-[#f7e5d4] hover:bg-yellow-500 text-black p-4 rounded-lg text-lg flex flex-col items-center">
              <Gift className="mb-2 text-4xl text-black" />
              <span className="text-black">Quà Tết</span>
            </Button>
            <Button className="bg-[#f7e5d4] hover:bg-yellow-500 text-black p-4 rounded-lg text-lg flex flex-col items-center">
              <Truck className="mb-2 text-4xl text-black" />
              <span className="text-black">Hộp quà Tết</span>
            </Button>
            <Button className="bg-[#f7e5d4] hover:bg-yellow-500 text-black p-4 rounded-lg text-lg flex flex-col items-center">
              <ShoppingCart className="mb-2 text-4xl text-black" />
              <span className="text-black">Giỏ quà Tết</span>
            </Button>
            <Button className="bg-[#f7e5d4] hover:bg-yellow-500 text-black p-4 rounded-lg text-lg flex flex-col items-center">
              <ShieldCheck className="mb-2 text-4xl text-black" />
              <span className="text-black">Quà tặng sức khỏe</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
