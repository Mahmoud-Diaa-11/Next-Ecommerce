"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";

import Loading from "@/app/loading";
import { getUserOrders } from "@/app/services/user/getUserOrders.api";
import { OrderType } from "@/types/OrdersType";

export default function AllOrdersCard() {
  const [orderItems, setOrderItems] = useState<OrderType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  async function handleGetUserOrders() {
    setIsLoading(true);
    const data = await getUserOrders();
    setOrderItems(data);
    setIsLoading(false);
  }
  useEffect(() => {
    handleGetUserOrders();
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="container">
        <div className="p-6 space-y-5 ">
          {orderItems?.map((order) =>
            order?.cartItems.map((item) => (
              <div
                key={item?.product._id}
                className="border group rounded-lg overflow-hidden shadow-md duration-300 p-4 gap-x-10 flex justify-between dark:hover:shadow-zinc-700 dark:shadow-md hover:shadow-xl transition-shadow"
              >
                <div>
                  <Image
                    loading="eager"
                    width={400}
                    height={200}
                    src={item?.product.imageCover}
                    alt={item?.product.title}
                    className="w-full transition-all duration-500 group-hover:scale-[1.1] h-48 object-cover rounded-md mb-4"
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold text-lg">
                    {item?.product.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Brand: {item?.product.brand.name} | Category:{" "}
                    {item?.product.category.name}
                  </p>
                  <p className="mt-2 font-medium">Price: ${item?.price}</p>
                  <p className="text-gray-600">Quantity: {item?.count}</p>
                  <p className="mt-2 text-sm flex">
                    Rating: {item?.product.ratingsAverage}
                    <Star className="fill-green-600 text-green-600" />
                  </p>
                  <p
                    className={`mt-2 font-semibold ${
                      order?.isPaid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {order?.isPaid
                      ? `Paid at: ${new Date(order?.paidAt!).toLocaleDateString()}`
                      : "Not Paid"}
                  </p>
                </div>
              </div>
            )),
          )}
        </div>
      </div>
    </>
  );
}
