
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import "../css/swiperStyles.css";
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
// import Slide from './Slide';
import { useTranslations } from "next-intl";


export default function App() {
  const t = useTranslations("HeroSection");
 
    // slide data
  const slideData = [
    {
      id: 0,
      title: `${t("trending_item")}`,
      img: "/assets/shop-1.webp",
      price: "$20",
      desc: `${t("men_sunglasses")}`,
    },
    {
      id: 1,
      title: `${t("new_fashion_summer_sale")}`,
      img: "/assets/shop-2.webp",
      price: "$20",
      desc: `${t("women_latest_fashion")}`,
    },
    {
      id: 2,
      title: `${t("trending_earring")}`,
      img: "/assets/shop-3.webp",
      price: "$20",
      desc: `${t("women_latest_fashion_sale")}`,
    },
    {
      id: 3,
      title: `${t("modern_nails_design")}`,
      img: "/assets/shop-4.webp",
      price: "$20",
      desc: `${t("women_latest_design")}`,
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
          <div key={index}>
            <SwiperSlide>
              <img src={slide.img} alt={`slide-img-${index}`} className='rounded-3xl' />
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </>
  );
}
