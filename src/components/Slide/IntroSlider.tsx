import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Parallax } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/parallax";

export default function IntroSlider() {
  const slides = [
    "/images/slider.webp",
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
        className="w-full max-w-[1400px] h-[550px] relative"
      >
        {slides.map((image, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Ảnh nền siêu nét */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-100 hover:scale-105"
              style={{ backgroundImage: `url(${image})` }}
              data-swiper-parallax="-50%"
            ></div>

            {/* Hiệu ứng sáng dần */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
