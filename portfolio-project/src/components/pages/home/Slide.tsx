"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function HomeSlider() {
  const slides = [
    { id: 1, src: "/images/slide1.jpg", title: "Welcome to My Blog" },
    { id: 2, src: "/images/slide2.jpg", title: "Explore Latest Articles" },
    { id: 3, src: "/images/slide3.jpg", title: "Join the Community" },
  ];

  return (
    <div className="w-full h-[70vh]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        className="w-full h-full rounded-2xl"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                className="object-cover rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h2 className="text-white text-3xl md:text-5xl font-bold text-center drop-shadow-lg">
                  {slide.title}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
