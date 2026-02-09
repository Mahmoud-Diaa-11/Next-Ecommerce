export async function getBrands() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/brands",
    );
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
