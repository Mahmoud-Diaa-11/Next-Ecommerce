import getMyToken from "../getMyToken";

export default async function getLoggedUserCart() {
  const token = await getMyToken();
  if (!token) {
    return null;
  }
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: { token: `${token}` },
      },
    );
    if (!response.ok) {
      throw new Error("Failed to fetch cart data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}
