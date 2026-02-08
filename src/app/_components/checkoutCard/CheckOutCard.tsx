"use client";
import { cashPayment, onlinePayment } from "@/app/services/checkoutSession.api";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CartContext } from "@/context/CartContext";
import { checkoutSchema, CheckoutType } from "@/schema/checkoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
export default function CheckOutCard() {
  const router = useRouter();
  const cartContext = useContext(CartContext);
  const [paymentFlag, setPaymentFlag] = useState("");
  const { id }: { id: string } = useParams();
  const { handleSubmit, control } = useForm<CheckoutType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
  });
  async function handleCheckout(values: CheckoutType) {
    if (paymentFlag == "online") {
      const data = await onlinePayment(
        id,
        "https://next-ecommerce-delta-livid.vercel.app",
        values,
      );
      if (data.status == "success") {
        window.location.href = data.session.url;
      }
    } else {
      const data = await cashPayment(id, values);
      if (data.status == "success") {
        console.log(data);

        cartContext?.handleCart();
        router.push("/allorders");
      }
    }
  }
  return (
    <>
      <div className="w-1/2 mx-auto mt-7 space-y-7">
        <h2 className="font-semibold text-3xl text-green-600">Checkout Now:</h2>
        <form onSubmit={handleSubmit(handleCheckout)} className="space-y-5">
          <Controller
            name="details"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name} className="text-lg">
                  Details
                </FieldLabel>
                <Input
                  id={field.name}
                  className="focus:ring-1 focus:border focus:ring-green-600"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Details"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name} className="text-lg">
                  Phone
                </FieldLabel>
                <div className="relative">
                  <Input
                    type="text"
                    id={field.name}
                    className="focus:ring-1 focus:border focus:ring-green-600"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Phone"
                    autoComplete="off"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name} className="text-lg">
                  City
                </FieldLabel>
                <div className="relative">
                  <Input
                    type="text"
                    id={field.name}
                    className="focus:ring-1 focus:border focus:ring-green-600"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your City"
                    autoComplete="off"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex items-center gap-5">
            <Button
              onClick={() => {
                setPaymentFlag("online");
              }}
              className="cursor-pointer bg-green-600 transition-all duration-300 hover:bg-white hover:text-green-600 hover:outline-solid hover:outline-green-600 hover:outline-1   text-white "
              variant="outline"
            >
              Online Payment
            </Button>
            <Button
              onClick={() => {
                setPaymentFlag("cash");
              }}
              className="cursor-pointer bg-green-600 transition-all duration-300 hover:bg-white hover:text-green-600 hover:outline-solid hover:outline-green-600 hover:outline-1   text-white "
              variant="outline"
            >
              Cash Payment
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
