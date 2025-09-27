"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { userEmailSchema } from "@/lib/validations/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type FormData = z.infer<typeof userEmailSchema>;

interface EmailFormProps {
  user: { email: string };
  isLoading: boolean;
  sendVerification: (email: string) => void;
}

const EmailForm = ({ user, isLoading, sendVerification }: EmailFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userEmailSchema),
    defaultValues: {
      email: user.email,
    },
  });

  const onSubmitForm = (data: { email: string }) => {
    sendVerification(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className="grid gap-4">
        <div>
          <Label htmlFor="email" className="font-bold">
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="off"
              disabled={isLoading}
              defaultValue={user.email}
              className="w-full pr-10 bg-quaternary text-ternary placeholder:text-gray-500"
              {...register("email")}
            />
            {errors.email && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="absolute right-2 top-5 transform -translate-y-1/2 w-6 h-6 text-error"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
            )}
            {errors.email && (
              <p className="text-xs text-error">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            type="submit"
            disabled={isLoading}
            className="text-quaternary bg-rose-200 rounded-lg hover:bg-rose-200"
          >
            {isLoading ? "Loading..." : "Verify Email"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EmailForm;
