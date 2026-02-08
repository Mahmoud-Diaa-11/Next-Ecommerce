import { getUserId } from "./getUserId.api";

export async function getUserOrders() {
  const id = await getUserId();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
  );
  const data = await response.json();
  return data;
}
