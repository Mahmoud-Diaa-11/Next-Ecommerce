import getMyToken from "../getMyToken";

export async function deleteProductsFromCart(id: string) {
  const token = await getMyToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      method: "DELETE",
      headers: { token:`${token}`, },
    },
  );
  const data = response.json();
  return data;
}
