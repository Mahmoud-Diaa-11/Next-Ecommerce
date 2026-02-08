import getMyToken from "../getMyToken";

export default async function addProductToCart(id: string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("login to add products to cart");
  }
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    method: "POST",
    body: JSON.stringify({ productId: id }),
    headers: { token: `${token}`, "Content-Type": "application/json" },
  });
  const data = response.json();

  return data;
}
