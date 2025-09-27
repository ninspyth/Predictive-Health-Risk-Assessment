"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verificationCodeSchema } from "@/lib/validations/auth";

type FormData = z.infer<typeof verificationCodeSchema>;

interface VerifyCodeFormProps {
  user: { email: string };
  verifyCode: (verificationCode: string) => void;
  setPage: (page: number) => void;
}

const VerifyCodeForm = ({ user, setPage, verifyCode }: VerifyCodeFormProps) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: {
      email: user.email,
    },
  });

  const onSubmit = (data: { code: string }) => {
    verifyCode(data.code);
  };

  const handleBack = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email" className="font-bold">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="bg-quaternary placeholder:text-gray-500"
            defaultValue={user.email}
            {...register("email")}
            readOnly
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="code" className="font-bold">
            Enter Verification Code
          </Label>
          <InputOTP
            maxLength={6}
            onChange={(value: string) => setValue("code", value)}
            className="bg-quaternary"
          >
            <InputOTPGroup className="w-full flex justify-center items-center">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          {errors.code && (
            <p className="text-xs text-red-600">{errors.code.message}</p>
          )}
        </div>
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            className="bg-rose-200"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button type="submit" className="bg-rose-200">
            Verify Code
          </Button>
        </div>
      </div>
    </form>
  );
};

export default VerifyCodeForm;
