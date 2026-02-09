import getMyToken from "../getMyToken";

export async function updateCartCount(productId: string, newCount: number) {
  const token = await getMyToken();

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          count: String(newCount),
        }),
        headers: {
          token: `${token}`,
          "content-type": "application/json",
        },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
