"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getBrandDetails } from "@/app/services/Brands/getBrandDetails.api";
import { BrandDetailsItems } from "@/types/BrandsType";
export default function BrandDetailsCard({ id }: { id: string }) {
  const [brands, setBrands] = useState<null | BrandDetailsItems>(null);
  const [animate, setAnimate] = useState(false);
  async function handleBrandDetails() {
    const data = await getBrandDetails(id);
    setBrands(data.data);
    console.log(data);
  }
  useEffect(() => {
    handleBrandDetails();
  }, []);
  return (
    <div className="container min-h-screen lg:overflow-hidden py-10 flex flex-col justify-center items-center gap-6">
      <div
        className={`rounded-full overflow-hidden transition-all duration-2000 ${
          animate
            ? "translate-x-0 scale-110 lg:translate-x-100 -rotate-360"
            : "translate-x-0 scale-100 lg:-translate-x-100 rotate-0 lg:rotate-360"
        }`}
      >
        {brands?.image && (
          <Image
            width={400}
            height={400}
            src={brands?.image}
            alt="Brand Logo"
            className="w-48 h-48 md:w-80 md:h-80 shadow-2xl object-contain bg-white rounded-full"
          />
        )}
      </div>

      <Button
        onClick={() => setAnimate(!animate)}
        className="cursor-pointer text-md bg-green-600 transition-all duration-300 hover:bg-white hover:text-green-600 hover:outline-solid hover:outline-green-600 hover:outline-1 text-white "
        variant="outline"
      >
        Move it
      </Button>
    </div>
  );
}
