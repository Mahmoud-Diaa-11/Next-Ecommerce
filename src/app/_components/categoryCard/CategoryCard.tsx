"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCategories } from "@/app/services/category/getCategories.api";
import { CategoriesItems } from "@/types/CategoriesType";
import Loading from "@/app/loading";
export default function CategoryCard() {
  const [categories, setCategories] = useState<null | CategoriesItems[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  async function handleGetCategories() {
    setIsLoading(true);
    const data = await getCategories();
    console.log(data);
    setCategories(data);
    setIsLoading(false);
  }

  useEffect(() => {
    handleGetCategories();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container p-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {categories?.map((category) => {
            return (
              <Link key={category?._id} href={`categories/${category?._id}`}>
                <div className="text-center space-y-3 cursor-pointer dark:bg-zinc-800 dark:hover:shadow-zinc-700 p-6 rounded-xl shadow-xl group hover:shadow-lg duration-300  transition-all">
                  <Image
                    width={400}
                    height={200}
                    src={category?.image}
                    alt={category?.name}
                    className="w-full h-70 rounded-xl group-hover:scale-105 transition-all object-cover duration-300 "
                  />
                  <h3 className="text-lg font-semibold dark:text-white text-gray-800">
                    {category?.name}
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
