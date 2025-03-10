import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/parallax";

export default function IntroSlider() {
  const slides = [
    "/images/slide.jpeg",
  ];

  return (
    <section className="w-full flex justify-center relative">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade, Parallax]}
        effect="fade"
        slidesPerView={1}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        parallax
        speed={1200}
        className="w-full max-w-full h-[550px] relative"
      >
        {slides.map((image, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Ảnh nền siêu nét */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 transform scale-100 hover:scale-105"
              style={{ backgroundImage: `url(${image})` }}
              data-swiper-parallax="-50%"
            ></div>

            {/* Hiệu ứng sáng dần */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

            {/* Text overlay */}
            <div className="absolute bottom-10 left-10 text-white z-10">
              <h2 className="text-4xl font-bold mb-2">Welcome to HappyBox</h2>
              <p className="text-lg">Experience the joy of gifting</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
