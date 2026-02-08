import * as zod from "zod";

export const resetPasswordSchema = zod.object({
  email: zod.email("code must be valid").nonempty("code is required"),
  newPassword: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must be at least 8 characters long and include at least",
    ),
});

export type resetPasswordType = zod.infer<typeof resetPasswordSchema>;
