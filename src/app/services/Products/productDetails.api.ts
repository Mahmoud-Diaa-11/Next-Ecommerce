export async function getProductDetails(id: string) {
  try {
    let response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    );
    let { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
