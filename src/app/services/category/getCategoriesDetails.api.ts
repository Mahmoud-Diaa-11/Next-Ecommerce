export async function getCategoriesDetails(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
  );
  const data = response.json();
  return data;
}
