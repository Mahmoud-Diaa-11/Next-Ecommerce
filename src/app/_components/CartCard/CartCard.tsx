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
      if (data?.status == "success") {
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
      if (data?.status == "success") {
        toast.success("product updated successfully");
        await cartContext?.handleCart();
      }
      setBtnLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error");
    }
  }

  async function handleClearCart() {
    try {
      const data = await clearCart();
      console.log(data?.message);
      if (data?.message == "success") {
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
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-zinc-950 rounded-3xl shadow-2xl shadow-black/10 border border-black/5 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-gray-100 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded-2xl">
                <ShoppingCart className="text-green-600" size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Shopping Cart
                </h2>
                <p className="text-gray-500 font-medium">
                  {cartContext?.numOfCartItem} items selected
                </p>
              </div>
            </div>

            {cartContext && cartContext?.allProducts?.length > 0 && (
              <Button
                onClick={handleClearCart}
                variant="ghost"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 font-semibold gap-2 transition-all"
              >
                <Trash size={18} />
                Clear Cart
              </Button>
            )}
          </div>

          {cartContext && cartContext?.allProducts?.length > 0 && (
            <div className="bg-green-50/50 dark:bg-green-950/10 rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-4 border border-green-100/50 dark:border-green-900/20">
              <div className="flex flex-col">
                <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">
                  Total Balance
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-green-600">
                    {cartContext?.allProductsPrice}
                  </span>
                  <span className="text-lg font-bold text-green-700">EGP</span>
                </div>
              </div>
              <Link href={`/checkout/${cartData?.cartId}`}>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-10 py-6 rounded-xl text-lg font-bold shadow-lg shadow-green-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          )}

          <div className="space-y-8">
            {cartContext && cartContext?.allProducts?.length > 0 ? (
              cartContext?.allProducts?.map((product, index) => (
                <div
                  key={product?.product?._id}
                  className={`flex flex-col md:flex-row items-center md:items-start gap-8 pb-8 ${
                    index !== (cartContext?.allProducts?.length || 0) - 1
                      ? "border-b border-gray-50 dark:border-zinc-900"
                      : ""
                  }`}
                >
                  <div className="relative group overflow-hidden rounded-2xl bg-gray-50 dark:bg-zinc-900 aspect-square w-full md:w-48 shrink-0">
                    <Image
                      loading="eager"
                      alt={product?.product?.title || "Product"}
                      src={product?.product?.imageCover}
                      fill
                      className="object-contain rounded-2xl p-4 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 flex flex-col md:flex-row gap-6 w-full">
                    <div className="flex-1 space-y-2 text-center md:text-left">
                      <p className="text-green-600 text-sm font-bold uppercase tracking-tight">
                        {product?.product?.category?.name}
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                        {product?.product?.title}
                      </h3>
                      <div className="flex items-center  justify-center md:justify-start gap-3 pt-1">
                        <div className="flex items-center gap-1 dark:bg-green-950/20 px-2 py-0.5 rounded-lg">
                          <Star
                            className="text-yellow-400 fill-yellow-400"
                            size={14}
                          />
                          <span className="text-sm font-bold text-black dark:text-yellow-500">
                            {product?.product?.ratingsAverage}
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 flex items-center justify-center md:justify-start">
                        <div className="flex items-center bg-gray-100 dark:bg-zinc-900 rounded-xl p-1 border border-gray-200 dark:border-zinc-800">
                          <button
                            onClick={() =>
                              handleUpdateCartCount(
                                product?.product?._id,
                                Math.max(1, product?.count - 1),
                              )
                            }
                            disabled={btnLoading}
                            className="w-10 h-10 flex items-center justify-center font-bold text-xl rounded-lg hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-bold text-lg">
                            {product?.count}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateCartCount(
                                product?.product?._id,
                                product?.count + 1,
                              )
                            }
                            disabled={btnLoading}
                            className="w-10 h-10 flex items-center justify-center font-bold text-xl rounded-lg hover:bg-green-600 hover:text-white transition-all disabled:opacity-50"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end justify-between gap-4 md:min-w-[140px]">
                      <div className="text-right">
                        <span className="text-3xl font-black text-gray-900 dark:text-white">
                          {product?.price}
                        </span>
                        <span className="ml-1 font-bold text-gray-500">
                          EGP
                        </span>
                      </div>
                      <Button
                        disabled={btnLoading}
                        variant="ghost"
                        onClick={() =>
                          handleDeleteFromCart(product?.product?._id)
                        }
                        className="text-white hover:text-white bg-red-500 hover:bg-red-700 dark:hover:bg-red-800 transition-all font-semibold gap-2"
                      >
                        <Trash size={16} />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-full mb-6">
                  <ShoppingCart size={64} className="text-gray-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-8 max-w-xs">
                  Looks like you haven&#39;t added anything to your cart yet.
                </p>
                <Link href="/products">
                  <Button className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg shadow-green-600/20 transition-all hover:scale-105">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
