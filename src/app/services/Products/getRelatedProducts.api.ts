export async function getRealatedProducts(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
  );
  const { data } = await response.json();

  return data;
}
