"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { CategoryType } from "@/types/types";
import Image from "next/image";
export default function CategorySwiper({
  allCategory,
}: {
  allCategory: CategoryType[];
}) {
  return (
    <>
      <Swiper
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 7 },
        }}
        modules={[Autoplay]}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
      >
        {allCategory?.map((category) => (
          <SwiperSlide key={category?._id} className="text-center">
            <Image
              height={500}
              width={500}
              src={category?.image}
              alt={category?.name}
              className="w-full object-cover h-50 cursor-pointer"
            />
            <h3 className="font-semibold">{category?.name}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
