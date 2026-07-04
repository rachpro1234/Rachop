'use client'

import React, { useState } from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Thumbs } from "swiper/modules";

interface SliderProps {
    images: string[];
    thumbs: {
        thumbsSwiper: SwiperType | null;
        setThumbsSwiper: React.Dispatch<React.SetStateAction<SwiperType | null>>;
    };
}

const ThumbnailSlider = ({ images}: { images: string[] }) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)

    return (
        // container for both main slider and thumbnail slider
        <div className="w-4/5 h-4/5 flex flex-col gap-4">
          <Slider images={images} thumbs={{ thumbsSwiper, setThumbsSwiper }} />
          <Thumbnail images={images}  thumbs={{ thumbsSwiper, setThumbsSwiper }} />
        </div>
    )
};

const Slider = ({ images, thumbs }: SliderProps) => {
    const { thumbsSwiper } = thumbs;
    return (
        // main image slider component
        <div className="w-full h-full flex-1 overflow-hidden">
         <Swiper className="h-full" 
         grabCursor 
         loop
         thumbs={{ swiper: thumbsSwiper }}
         modules={[Thumbs]}
         >
           {/* /* iterate over images to create each slide */ }
           {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image 
                 src={image}
                 alt="slide"
                 fill
                 className="object-cover"
                 sizes="70vw"
                 priority={index === 0 && true} // ensure first image loads with priority
                />
              </div>
            </SwiperSlide>
           ))};
         </Swiper>
        </div>
    );
};

const Thumbnail = ({ images, thumbs }: SliderProps) => {
    const { setThumbsSwiper } = thumbs;
    return (
        <div className="relative flex gap-2 justify-center h-14">
           <Swiper className="w-2/4 h-full" 
           loop 
           slidesPerView={4} 
           spaceBetween={8}
            onSwiper={setThumbsSwiper}
            freeMode
            watchSlidesProgress
           >
             {/* // iterate over images to create each thumbnail slide */}
             {images.map((image, index) => (
               <SwiperSlide key={index}>
                 <div className="relative w-full h-full">
                   <Image 
                    src={image}
                    alt="thumbnail"
                    fill
                    className="object-cover"
                    sizes="100px"
                   />
                 </div>
               </SwiperSlide>
             ))};
           </Swiper>
        </div>
    )
}
export default ThumbnailSlider;