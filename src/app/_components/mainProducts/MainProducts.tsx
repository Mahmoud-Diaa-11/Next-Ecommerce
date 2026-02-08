import getAllProducts from "@/app/services/Products/getAllProducts.api";

import { ProductType } from "@/types/types";
import ProductsCard from "../ProductsCard/ProductsCard";

export default async function MainProducts() {
  const allProducts: ProductType[] = await getAllProducts();

  return (
    <>
      {allProducts?.map((product) => (
        <ProductsCard key={product._id} product={product} />
      ))}
    </>
  );
}
