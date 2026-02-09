export async function getRealatedProducts(id: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
    );
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
