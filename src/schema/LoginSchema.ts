import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod.email("email must be valid").nonempty("email is required"),
  password: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must be at least 8 characters long and include at least",
    ),
});

export type LoginType = zod.infer<typeof loginSchema>;
