"use client";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerSchema, RegisterType } from "@/schema/RegisterSchema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema, LoginType } from "@/schema/LoginSchema";
import Link from "next/link";
import { signIn, SignInResponse } from "next-auth/react";
import toast from "react-hot-toast";
export default function LoginForm() {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const myForm = useForm<LoginType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const router: any = useRouter();

  const handleSignIn = async (values: LoginType) => {
    const response: SignInResponse | undefined = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (response?.ok) {
      toast.success("logged in successfully");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else {
      toast.error("invalid email or password", { duration: 3000 });
    }
  };

  return (
    <>
      <div className="w-1/2 mx-auto mt-7 space-y-7">
        <h2 className="font-semibold text-3xl text-green-600">Login Now:</h2>
        <form
          onSubmit={myForm.handleSubmit(handleSignIn)}
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
                  placeholder="Enter Your Email"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={myForm.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor={field.name} className="text-lg">
                  Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    type={isPasswordHidden ? "password" : "text"}
                    id={field.name}
                    className="focus:ring-1 focus:border focus:ring-green-600"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter password"
                    autoComplete="off"
                  />

                  {isPasswordHidden ? (
                    <svg
                      onClick={() => {
                        setIsPasswordHidden(false);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 cursor-pointer absolute top-2 right-2 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 cursor-pointer absolute top-2 right-2"
                      onClick={() => {
                        setIsPasswordHidden(true);
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="flex flex-col gap-3 md:flex-row md:justify-between justify-center items-center">
            <Button
              className="cursor-pointer bg-green-600 transition-all duration-300 hover:bg-white hover:text-green-600 hover:outline-solid hover:outline-green-600 hover:outline-1   text-white "
              variant="outline"
            >
              Login
            </Button>
            <h3>
              Don't have an account
              <Link
                className="underline ml-1 text-green-600 hover:text-green-700"
                href={"/register"}
              >
                Sign up
              </Link>
            </h3>
            <h3>
              <Link
                className="underline ml-1 text-green-600 hover:text-green-700"
                href={"/forgotPassword"}
              >
                forgot your password?
              </Link>
            </h3>
          </div>
        </form>
      </div>
    </>
  );
}
