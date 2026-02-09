export default async function getAllProducts() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products",
      { cache: "no-store" },
    );
    const { data } = await response.json();
    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
}
