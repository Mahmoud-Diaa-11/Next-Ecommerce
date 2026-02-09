"use client";
import Image from "next/image";
import Link from "next/link";
import { Star, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/types/types";
import { deleteFromWishlist } from "@/app/services/wishlist/deleteFromWishlist.api";
import { getLoggedUserWishlist } from "@/app/services/wishlist/getLoggedUserWishlist";
import MyButton from "@/app/_components/myButton/MyButton";

export default function WishListCard() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["getLoggedWishlist"],
    queryFn: getLoggedUserWishlist,
  });
  console.log(data);

  const { mutate: deleteProduct } = useMutation({
    mutationFn: (id: string) => {
      return deleteFromWishlist(id);
    },
    onSuccess: (mutateData) => {
      toast.success("deleted");
      (queryClient.invalidateQueries({ queryKey: ["getLoggedWishlist"] }),
        console.log(mutateData));
    },
    onError: () => {
      toast.error("nooooooo");
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container rounded-3xl mt-15  shadow-xl shadow-black/50 p-8">
        {data?.data.length > 0 ? (
          data?.data?.map((product: ProductType) => {
            return (
              <div
                key={product?._id}
                className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 pt-3 border-b p-3 pb-6 md:pb-3 text-center md:text-left "
              >
                <div className="flex flex-col md:flex-row md:items-start items-center gap-4">
                  <Image
                    className="w-37.5 rounded-2xl"
                    src={product?.imageCover}
                    width={400}
                    height={200}
                    alt={product?.title}
                  />
                  <div className="space-y-1 flex flex-col items-center md:items-start ">
                    <h3 className="font-semibold text-3xl line-clamp-1">
                      {product?.title}
                    </h3>
                    <p className="text-gray-600 text-lg">
                      {product?.category?.name}
                    </p>
                    <span className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" />
                      {product?.ratingsAverage}
                    </span>
                  </div>
                </div>
                <div className="flex items-center w-full md:w-auto">
                  <div className="flex flex-col md:flex-row items-center gap-3 w-full">
                    <p className="text-lg font-semibold">{product?.price} EGP</p>
                    <Button
                      className="bg-red-600 dark:text-white cursor-pointer hover:bg-red-700"
                      onClick={() => {
                        deleteProduct(product?._id);
                      }}
                    >
                      Delete From Wishlist
                      <Trash className="fill-red-500 text-white cursor-pointer" />
                    </Button>
                    <MyButton id={product?._id} />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className=" flex justify-center items-center p-3 py-5">
            <h2 className="py-5 px-4">Your Wishlist Is Empty</h2>
            <Link
              className="bg-green-600 text-white p-2 rounded-lg"
              href={"/products"}
            >
              Go Shopping
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
