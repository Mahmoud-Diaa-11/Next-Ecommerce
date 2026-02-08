"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  verifyPasswordCodeSchema,
  VerifyPasswordCodeType,
} from "@/schema/VerifyPasswordCodeSchema";
import verifyPasswordCode from "@/app/services/auth/verifyPasswordCode.api";
export default function VerifyPasswordCodeForm() {
  const myForm = useForm<VerifyPasswordCodeType>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(verifyPasswordCodeSchema),
    mode: "onChange",
  });

  const router: any = useRouter();

  const handleVerifyPassword = async (values: VerifyPasswordCodeType) => {
    await verifyPasswordCode(values, router);
  };

  return (
    <>
      <div className="w-1/2 mx-auto mt-7 space-y-7">
        <h2 className="font-semibold text-3xl text-green-600">Verify Code:</h2>
        <form
          onSubmit={myForm.handleSubmit(handleVerifyPassword)}
          className="space-y-5"
        >
          <Controller
            name="resetCode"
            control={myForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name} className="text-lg">
                  Verify Code
                </FieldLabel>
                <Input
                  id={field.name}
                  className="focus:ring-1 focus:border focus:ring-green-600"
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Code"
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
