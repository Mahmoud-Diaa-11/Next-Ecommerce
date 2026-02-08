"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import Loading from "@/app/loading";
import { getBrands } from "@/app/services/Brands/getBrands.api";
import { BrandsItems } from "@/types/BrandsType";

export default function BrandCard() {
  const [brands, setBrands] = useState<null | BrandsItems[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  async function handlegetBrands() {
    setIsLoading(true);
    const data = await getBrands();
    setBrands(data);
    setIsLoading(false);
  }
  useEffect(() => {
    handlegetBrands();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container p-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {brands?.map((brand) => {
            return (
              <Link key={brand._id} href={`brands/${brand._id}`}>
                <div className="text-center cursor-pointer dark:bg-zinc-800 dark:hover:shadow-zinc-700 p-6 rounded-xl shadow-xl group hover:shadow-lg duration-300  transition-all">
                  <Image
                    width={400}
                    height={200}
                    src={brand?.image}
                    alt="Brand Logo"
                    className="w-full group-hover:scale-105 transition-all duration-300 object-contain mx-auto mb-2"
                  />
                  <h3 className="text-lg font-semibold dark:text-white text-gray-800">
                    {brand?.name}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
