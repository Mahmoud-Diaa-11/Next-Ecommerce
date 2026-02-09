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
      <div className="container min-h-screen lg:overflow-hidden py-10 flex flex-col justify-center items-center gap-6">
        <div
          className={`rounded-full overflow-hidden transition-all duration-2000 ${
            animate
              ? "translate-x-0 scale-110 lg:translate-x-100 -rotate-360"
              : "translate-x-0 scale-100 lg:-translate-x-100 rotate-0 lg:rotate-360"
          }`}
        >
          {category?.image && (
            <Image
              width={400}
              height={400}
              src={category?.image}
              alt="Category Logo"
              className="w-48 h-48 md:w-80 md:h-80 shadow-2xl object-cover bg-white rounded-full"
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
