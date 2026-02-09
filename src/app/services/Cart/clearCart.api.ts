import getMyToken from "../getMyToken";

export async function clearCart() {
  const token = await getMyToken();
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        method: "DELETE",
        headers: { token: `${token}` },
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
