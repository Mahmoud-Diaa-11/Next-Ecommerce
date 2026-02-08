"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ShoppingCart, Star, Trash } from "lucide-react";
import toast from "react-hot-toast";

import { CartType } from "@/types/CartTypes";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { updateCartCount } from "@/app/services/Cart/updateCartCount.api";
import { clearCart } from "@/app/services/Cart/clearCart.api";
import { deleteProductsFromCart } from "@/app/services/Cart/deleteProductsFromCart.api";
export default function CartCard() {
  const cartContext = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [cartData, setCartData] = useState<CartType | undefined>(undefined);
  async function handleGetUserCart() {
    const data = await cartContext?.handleCart();
    setCartData(data);
    setIsLoading(false);
  }

  async function handleDeleteFromCart(id: string) {
    setBtnLoading(true);
    try {
      const data = await deleteProductsFromCart(id);
      if (data.status == "success") {
        toast.success("product deleted successfully");
        await cartContext?.handleCart();
      }
    } catch (error) {
      console.log(error);
      toast.error("can't delete product");
    } finally {
      setBtnLoading(false);
    }
  }

  async function handleUpdateCartCount(
    productId: string,
    productCount: number,
  ) {
    try {
      setBtnLoading(true);
      const data = await updateCartCount(productId, productCount);
      if (data.status == "success") {
        toast.success("product updated successfully");
        await cartContext?.handleCart();
      }
      setBtnLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  }

  async function handleClearCart() {
    try {
      const data = await clearCart();
      console.log(data);
      if (data.message == "success") {
        cartContext?.setAllProducts([]);
        toast.success("cart cleared successfully");
        await cartContext?.handleCart();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  }
  useEffect(() => {
    handleGetUserCart();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          <i className="fa-solid fa-spinner fa-spin text-7xl text-green-600"></i>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container rounded-3xl mt-15  shadow-xl shadow-black/50 p-8">
        <div className="mb-3">
          <div className="flex items-center justify-between ">
            <div className=" flex items-center gap-3">
              <ShoppingCart
                className="text-green-600 fill-green-600 "
                size={40}
              />
              <h2 className="font-semibold text-4xl py-2  ">Shopping Cart</h2>
            </div>

            {cartContext && cartContext.allProducts.length > 0 ? (
              <Button
                onClick={handleClearCart}
                className="bg-red-600 cursor-pointer dark:text-white hover:bg-red-700"
              >
                Clear Cart
              </Button>
            ) : (
              ""
            )}
          </div>
          <p className="text-gray-600 text-lg border-b pb-5 border-b-gray-300">
            {cartContext?.numOfCartItem} items in your cart
          </p>
          {cartContext && cartContext.allProducts.length > 0 ? (
            <p className="mx-auto p-3 my-4 text-2xl border rounded-2xl w-fit">
              <span className="font-semibold">Total Cart Price</span> :
              <span className="text-green-600 font-medium mx-2">
                {cartContext?.allProductsPrice}
              </span>
              EGP
            </p>
          ) : (
            ""
          )}
        </div>
        {cartContext && cartContext.allProducts.length > 0 ? (
          cartContext?.allProducts?.map((product) => (
            <div
              key={product._id}
              className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 pt-3 border-b p-3 pb-6 md:pb-3 text-center md:text-left"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                <Image
                  loading="eager"
                  alt="asd"
                  src={product.product.imageCover}
                  width={400}
                  height={400}
                  className="w-37.5 rounded-2xl"
                />
                <div className="space-y-1 flex flex-col items-center md:items-start">
                  <h3 className="font-semibold text-3xl">
                    {product.product.title}
                  </h3>
                  <p className="text-gray-600 text-lg">
                    {product.product.category.name}
                  </p>
                  <span className="flex items-center gap-1">
                    <Star className="text-yellow-400 fill-yellow-400" />
                    {product.product.ratingsAverage}
                  </span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-6 w-full md:w-auto">
                <div>
                  <span
                    onClick={() => {
                      handleUpdateCartCount(
                        product.product._id,
                        product.count - 1,
                      );
                    }}
                    className={`px-3 ${btnLoading ? "cursor-no-drop bg-green-900 border-green-900 " : "cursor-pointer bg-green-600 border-green-600 "}  text-white rounded-tl-lg rounded-bl-lg  py-2 border`}
                  >
                    -
                  </span>
                  <span className="px-5  py-2 border">{product.count}</span>

                  <span
                    onClick={() => {
                      handleUpdateCartCount(
                        product.product._id,
                        product.count + 1,
                      );
                    }}
                    className={`px-3 ${btnLoading ? "cursor-no-drop bg-green-900 border-green-900" : "cursor-pointer bg-green-600 border-green-600"}  text-white bg-green-600 ransition-all duration-300 rounded-tr-lg rounded-br-lg border-green-600 py-2 border`}
                  >
                    +
                  </span>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-3 w-full">
                  <span className="text-lg font-semibold whitespace-nowrap">
                    {product.price} EGP
                  </span>
                  <Button
                    disabled={btnLoading}
                    className="bg-red-600 dark:text-white cursor-pointer hover:bg-red-700"
                    onClick={() => {
                      handleDeleteFromCart(product.product._id);
                    }}
                  >
                    Delete Item
                    <Trash className="fill-red-500 text-white cursor-pointer" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center p-3 py-5">
            <h2 className="py-5">
              Your Cart Is Empty
              <Link
                className="bg-green-600 text-white p-2 rounded-lg"
                href={"/products"}
              >
                Go Shopping
              </Link>
            </h2>
          </div>
        )}
        {cartContext && cartContext.allProducts.length > 0 && (
          <div className="flex justify-end">
            <Link href={`/checkout/${cartData?.cartId}`}>
              <Button
                variant={"outline"}
                className=" mx-4 mt-5 cursor-pointer text-md  bg-green-600 transition-all duration-300 hover:bg-white hover:text-green-600 hover:outline-solid hover:outline-green-600 hover:outline-1 text-white  "
              >
                Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
