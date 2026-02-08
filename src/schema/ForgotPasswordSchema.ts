import * as zod from "zod";

export const ForgotPasswordSchema = zod.object({
  email: zod.email("email must be valid").nonempty("email is required"),
});

export type ForgetPasswordType = zod.infer<typeof ForgotPasswordSchema>;
