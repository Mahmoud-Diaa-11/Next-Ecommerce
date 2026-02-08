import { ProductType } from "@/types/types";
import React from "react";
import { Button } from "@/components/ui/button";

import { Star } from "lucide-react";
import { getRealatedProducts } from "@/app/services/Products/getRelatedProducts.api";
import Image from "next/image";
import MyButton from "../myButton/MyButton";
export default async function ProductDetailsCard({
  productDetails,
  id,
}: {
  productDetails: ProductType;
  id: string;
}) {
  return (
    <>
      <div className="md:col-span-4">
        <Image
          height={500}
          width={500}
          className="w-full rounded-2xl"
          src={productDetails?.imageCover}
          alt={productDetails?.title}
        />
      </div>
      <div className="text-center md:text-left md:col-span-8 space-y-5">
        <h2 className="text-2xl font-semibold">{productDetails?.title}</h2>
        <h3 className="text-lg text-green-600">
          {productDetails?.category.name}
        </h3>
        <p>{productDetails?.description}</p>
        <div className="w-full flex justify-between">
          <p>
            {productDetails?.price} <span>L.E</span>
          </p>
          <p className="flex items-center gap-1">
            {productDetails?.ratingsAverage}
            <Star className="fill-green-600 text-green-600" />
          </p>
        </div>
        <MyButton className="w-full" id={id} />
      </div>
    </>
  );
}
