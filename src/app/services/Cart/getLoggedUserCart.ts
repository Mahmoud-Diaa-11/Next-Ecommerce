import getMyToken from "../getMyToken";

export default async function getLoggedUserCart() {
  const token = await getMyToken();
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: { token: `${token}` },
  });
  const data = await response.json();
  return data;
}
