"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  resetPasswordSchema,
  resetPasswordType,
} from "@/schema/ResetPasswordSchema";
import resetPassword from "@/app/services/auth/resetPassword.api";
export default function VerifyPasswordCodeForm() {
  const myForm = useForm<resetPasswordType>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const router: any = useRouter();

  const handleResetPassword = async (values: resetPasswordType) => {
    await resetPassword(values, router);
  };

  return (
    <>
      <div className="w-1/2 mx-auto mt-7 space-y-7">
        <h2 className="font-semibold text-3xl text-green-600">
          Reset Password :
        </h2>
        <form
          onSubmit={myForm.handleSubmit(handleResetPassword)}
          className="space-y-5"
        >
          <Controller
            name="email"
            control={myForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name} className="text-lg">
                  Email
                </FieldLabel>
                <Input
                  id={field.name}
                  className="focus:ring-1 focus:border focus:ring-green-600"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="newPassword"
            control={myForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name} className="text-lg">
                  New Password
                </FieldLabel>
                <Input
                  id={field.name}
                  className="focus:ring-1 focus:border focus:ring-green-600"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your new password"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button
            className="cursor-pointer bg-green-600 transition-all duration-300 hover:bg-white hover:text-green-600 hover:outline-solid hover:outline-green-600 hover:outline-1   text-white "
            variant="outline"
          >
            Reset
          </Button>
        </form>
      </div>
    </>
  );
}
