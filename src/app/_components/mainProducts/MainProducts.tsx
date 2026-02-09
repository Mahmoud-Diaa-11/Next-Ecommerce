"use client";

import getAllProducts from "@/app/services/Products/getAllProducts.api";

import { ProductType } from "@/types/types";
import ProductsCard from "../ProductsCard/ProductsCard";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";

export default function MainProducts() {
  const {
    data: allProducts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    retry: 3,
    staleTime: 1000 * 60,
  });

  if (isLoading) return <div className="h-screen fixed inset-0 flex justify-center items-center"><Loading /></div>;
  if (isError) return <p>Something went wrong</p>;

  return (
    <>
      {allProducts?.map((product: ProductType) => (
        <ProductsCard key={product?._id} product={product} />
      ))}
    </>
  );
}
