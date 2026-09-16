
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import "../css/swiperStyles.css";
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { useTranslations } from "next-intl";


export default function App() {
  const t = useTranslations("Hero");
 
    // slide data
  const slideData = [
    {
      id: 0,
      img: "/assets/shop-1.webp",
    },
    {
      id: 1,
      img: "/assets/shop-2.webp",
    },
    {
      id: 2,
      img: "/assets/shop-3.webp",
    },
    {
      id: 3,
      img: "/assets/shop-4.webp",
    },
  ];

  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={1}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {slideData.map((slide, index) => (
            <SwiperSlide key={slide.id}>
              <img src={slide.img} alt={`slide-img-${index}`} className='rounded-3xl' />
            </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
