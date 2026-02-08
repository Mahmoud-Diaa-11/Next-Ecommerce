"use client";
import { getCategoriesDetails } from "@/app/services/category/getCategoriesDetails.api";
import { Button } from "@/components/ui/button";
import { CategoryDetailsItems } from "@/types/CategoriesType";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CategoriesDetailsCard({ id }: { id: string }) {
  const [category, setCategory] = useState<null | CategoryDetailsItems>(null);
  const [animate, setAnimate] = useState(false);
  async function handleCategoriesDetails() {
    const data = await getCategoriesDetails(id);
    setCategory(data.data);
    console.log(data);
  }
  useEffect(() => {
    handleCategoriesDetails();
  }, []);
  return (
    <>
      <div className="container h-screen overflow-hidden  flex flex-col justify-center items-center gap-6">
        <div
          className={`rounded-full overflow-hidden transition-transform duration-2000 ${
            animate
              ? "translate-x-100 -rotate-360"
              : "-translate-x-100 rotate-360"
          }`}
        >
          {category?.image && (
            <Image
              width={200}
              height={200}
              src={category?.image}
              alt="Brand Logo"
              className="w-100 h-100 shadow-2xl object-cover "
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
    </>
  );
}
