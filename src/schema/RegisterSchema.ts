import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("name is required")
      .min(3, "name min is 3 ")
      .max(8, "name max is 8 chars"),
    email: zod.email("email must be valid").nonempty("email is required"),
    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
        "Password must be at least 8 characters long and include at least",
      ),
    rePassword: zod.string().nonempty("repassword is required"),
    phone: zod
      .string()
      .nonempty("Phone is required")
      .regex(/^01[0125][0-9]{8}$/, "number must be egyptain number"),
  })
  .refine((object) => object.password == object.rePassword, {
    path: ["rePassword"],
    error: "repassword must be same as password",
  });

export type RegisterType = zod.infer<typeof registerSchema>;
