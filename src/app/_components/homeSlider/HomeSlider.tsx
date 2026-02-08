"use client";
import Image from "next/image";
import imageSlider1 from "../../../../public/Images/home-slider-1.png";
import imageSlider2 from "../../../../public/Images/slider-image-2.jpeg";
import imageSlider3 from "../../../../public/Images/slider-image-3.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
export default function HomeSlider() {
  return (
    <>
      <div className="hidden md:grid grid-cols-12">
        <div className="col-span-8">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
          >
            <SwiperSlide>
              <Image
                src={imageSlider1}
                alt="slider"
                className="h-125 w-full object-cover"
                loading="eager"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={imageSlider2}
                alt="slider"
                className="h-125 w-full object-cover"
                loading="eager"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={imageSlider3}
                alt="slider"
                className="h-125 w-full object-cover"
                loading="eager"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="col-span-4">
          <Image
            src={imageSlider2}
            alt="slider"
            className="h-62.5 w-full object-cover"
            loading="eager"
          />
          <Image
            src={imageSlider3}
            alt="slider"
            className="h-62.5 w-full object-cover"
            loading="eager"
          />
        </div>
      </div>

      <div className="flex flex-col md:hidden">
        <div className="">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
          >
            <SwiperSlide>
              <Image
                src={imageSlider1}
                alt="slider"
                className="h-125 w-full object-cover"
                loading="eager"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={imageSlider2}
                alt="slider"
                className="h-125 w-full object-cover"
                loading="eager"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Image
                src={imageSlider3}
                alt="slider"
                className="h-125 w-full object-cover"
                loading="eager"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="flex lg:hidden">
          <Image
            src={imageSlider2}
            alt="slider"
            className="h-62.5 w-1/2 object-cover"
            loading="eager"
          />
          <Image
            src={imageSlider3}
            alt="slider"
            className="h-62.5 w-1/2 object-cover"
            loading="eager"
          />
        </div>
      </div>
    </>
  );
}
