"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ProductType } from "@/types/types";
import ProductsCard from "../ProductsCard/ProductsCard";
export default function ProductSwiper({
  relatedProducts,
}: {
  relatedProducts: ProductType[];
}) {
  return (
    <>
      <Swiper
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
        }}
        spaceBetween={50}
        slidesPerView={5}
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductsCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
