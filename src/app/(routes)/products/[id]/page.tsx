import ProductDetailsCard from "@/app/_components/ProductDetailsCard/ProductDetailsCard";
import ProductsCard from "@/app/_components/ProductsCard/ProductsCard";
import ProductSwiper from "@/app/_components/productSwiper/ProductSwiper";
import { getRealatedProducts } from "@/app/services/Products/getRelatedProducts.api";
import { getProductDetails } from "@/app/services/Products/productDetails.api";

import { ProductType } from "@/types/types";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const productDetails: ProductType = await getProductDetails(id);
  const relatedProducts: ProductType[] = await getRealatedProducts(
    productDetails?.category?._id,
  );

  return (
    <>
      <section>
        <div className="container p-9">
          <div className="grid sm:grid-cols-1 gap-8  md:grid-cols-12">
            <ProductDetailsCard id={id} productDetails={productDetails} />
          </div>

          <div className="py-10">
            <h2 className="text-3xl my-2 font-semibold">Related Products</h2>
            <ProductSwiper relatedProducts={relatedProducts} />
          </div>
        </div>
      </section>
    </>
  );
}
