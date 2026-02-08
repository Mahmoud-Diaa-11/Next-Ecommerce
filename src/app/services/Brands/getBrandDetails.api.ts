export async function getBrandDetails(id: string) {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
  );
  const data = await response.json();
  return data;
}
