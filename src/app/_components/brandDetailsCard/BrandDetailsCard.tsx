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
    <div className="container h-screen overflow-hidden  flex flex-col justify-center items-center gap-6">
      <div
        className={`rounded-full overflow-hidden transition-transform duration-2000 ${
          animate
            ? "translate-x-100 -rotate-360"
            : "-translate-x-100 rotate-360"
        }`}
      >
        {brands?.image && (
          <Image
            width={200}
            height={200}
            src={brands?.image}
            alt="Brand Logo"
            className="w-100 h-100 shadow-2xl "
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
