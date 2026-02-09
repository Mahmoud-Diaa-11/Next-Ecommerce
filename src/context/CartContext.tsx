"use client";
import getLoggedUserCart from "@/app/services/Cart/getLoggedUserCart";
import { CartContextType } from "@/types/CartContextType";
import { CartProductType } from "@/types/CartTypes";
import { createContext, useEffect, useState, ReactNode } from "react";

export const CartContext = createContext<CartContextType | null>(null);

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [numOfCartItem, setNumOfCartItem] = useState<number | null>(null);
  const [allProducts, setAllProducts] = useState<CartProductType[]>([]);
  const [allProductsPrice, setAllProductsPrice] = useState<number | null>(null);

  async function handleCart() {
    const data = await getLoggedUserCart();
    if (data?.status === "success" && data?.data) {
      setAllProducts(data.data.products || []);
      let sum = 0;
      data.data.products?.forEach((product: CartProductType) => {
        sum += product.count;
      });
      setNumOfCartItem(sum);
      setAllProductsPrice(data.data.totalCartPrice || 0);
    } else {
      if (data?.statusCode === 404 || data?.message?.includes("not found")) {
        setAllProducts([]);
        setNumOfCartItem(0);
        setAllProductsPrice(0);
      }
    }
    return data;
  }

  useEffect(() => {
    handleCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        numOfCartItem,
        setNumOfCartItem,
        allProducts,
        setAllProducts,
        handleCart,
        allProductsPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
