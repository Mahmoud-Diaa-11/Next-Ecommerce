import getMyToken from "../getMyToken";

export async function getLoggedUserWishlist() {
  const token = await getMyToken();
  if (!token) {
    throw new Error("unAuthorized");
  }
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
      headers: {
        token,
      },
    },
  );
  const data = await response.json();
  return data;
}
