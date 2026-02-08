import { CheckoutType } from "@/schema/checkoutSchema";
import getMyToken from "./getMyToken";

export async function onlinePayment(
  CartId: string,
  domain: string,
  formValues: CheckoutType,
) {
  const token = await getMyToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=${domain}`,
    {
      method: "POST",
      headers: { token:`${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ shippingAddress: formValues }),
    },
  );
  const data = await response.json();
  return data;
}
export async function cashPayment(
  CartId: string,
  formValues: CheckoutType,
) {
  const token = await getMyToken();
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,
    {
      method: "POST",
      headers: { token:`${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ shippingAddress: formValues }),
    },
  );
  const data = await response.json();
  return data;
}
