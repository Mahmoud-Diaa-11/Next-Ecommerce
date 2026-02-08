import * as zod from "zod";

export const checkoutSchema = zod.object({
  details: zod.string().nonempty("details is required"),
  phone: zod
    .string()
    .nonempty("number is required")
    .regex(/^01[0125][0-9]{8}$/, "number must be egyptain"),
  city: zod.string().nonempty("city is required"),
});

export type CheckoutType = zod.infer<typeof checkoutSchema>;
