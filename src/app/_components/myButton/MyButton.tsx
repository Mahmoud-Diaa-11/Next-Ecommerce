"use client";

import addProductToCart from "@/app/services/Products/addProductToCart.api";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function MyButton({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const router = useRouter();
  const cartContext = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAddToCart() {
    try {
      setIsLoading(true);
      const data = await addProductToCart(id);
      if (data.status == "success") {
        toast.success(data.message, { position: "top-right", duration: 2000 });
        cartContext?.handleCart();
      } else {
        toast.error("can't add to cart", {
          position: "top-right",
          duration: 2000,
        });
      }
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
      router.push("/login");
    }
  }

  return (
    <>
      <Button
        disabled={isLoading}
        onClick={handleAddToCart}
        className={`cursor-pointer text-md ${className} bg-green-600 transition-all duration-300 hover:bg-white hover:text-green-600 hover:outline-solid hover:outline-green-600 hover:outline-1 text-white `}
        variant="outline"
      >
        Add To Cart <ShoppingCart className="text-" />
      </Button>
    </>
  );
}
