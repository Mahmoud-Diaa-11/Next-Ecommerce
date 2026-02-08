import getMyToken from "../getMyToken";

export async function addToWishlist(id: string) {
  const token = await getMyToken();
  if (!token) {
    throw new Error("unAuthorized");
  }
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      method: "POST",
      body: JSON.stringify({ productId: `${id}` }),
      headers: { token, "Content-Type": "application/json" },
    },
  );
  const data = await response.json();
  return data;
}
