"use client";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, Star } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ProductType } from "@/types/types";
import { addToWishlist } from "@/app/services/wishlist/addToWishlist.api";
import MyButton from "@/app/_components/myButton/MyButton";

export default function ProductsCard({ product }: { product: ProductType }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      return await addToWishlist(product?._id);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["getLoggedWishlist"] });
    },
    onError: (data) => {
      toast.error(data?.message);
    },
  });

  return (
    <>
      <Card className="group px-2 dark:bg-zinc-800 py-5 hover:shadow-lg dark:hover:shadow-zinc-700 transition-all duration-300">
        <CardHeader className="relative overflow-hidden">
          <Image
            className="rounded-2xl transition-all duration-500 group-hover:scale-[1.1]"
            height={200}
            width={400}
            src={product?.imageCover}
            alt={product?.title}
            loading="eager"
          />
          <div className="absolute rounded-xl inset-0 opacity-0 transition-all duration-500 bg-black/70 group-hover:opacity-100 flex justify-center items-center gap-4">
            <Link href={`/products/${product?._id}`}>
              <Eye
                size={27}
                className="cursor-pointer text-white  hover:text-amber-300"
              />
            </Link>
            <Heart
              onClick={() => {
                mutate();
              }}
              size={27}
              className="cursor-pointer text-white hover:text-red-500 hover:fill-red-500"
            />
          </div>
        </CardHeader>
        <CardContent>
          <p>{product?.category?.name}</p>
          <Link href={`/products/${product?._id}`}>
            <h4 className="text-2xl line-clamp-1 text-green-600">
              {product?.title}
            </h4>
          </Link>
          <h3 className="line-clamp-1 my-2">{product?.description}</h3>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-between">
            <p>
              {product?.price} <span>L.E</span>
            </p>
            <p className="flex items-center gap-1.5">
              {product?.ratingsAverage}
              <Star className="fill-green-600 text-green-600" />
            </p>
          </div>
        </CardFooter>
        <MyButton id={product?._id} />
      </Card>
    </>
  );
}
