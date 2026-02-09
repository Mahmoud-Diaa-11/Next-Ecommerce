export async function getCategoriesDetails(id: string) {
  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
