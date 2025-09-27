"use client";

import * as React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";
import { EmailForm, VerifyCodeForm } from "@/components/Forms/index";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
const userSchema = {
  email: "",
};

export function UserRegistrationForm() {
  const [page, setPage] = React.useState(1);
  const [user, setUser] = React.useState(userSchema);
  const [code, setCode] = React.useState("");
  const [expiry, setExpiry] = React.useState(Date.now());
  const [loading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const verifyCode = async (verificationCode: string) => {
    const currentTime = Date.now();
    if (currentTime > expiry) {
      alert(
        "The verification code has already expired. Please request a new one."
      );
      return;
    }

    if (code == verificationCode) {
      try {
        const signInResult = await signIn("credentials", {
          email: user.email,
          callbackUrl,
        });

        if (signInResult?.ok && signInResult.url) {
          router.push(signInResult.url || "/");
        } else {
          alert("Unable to login");
        }
      } catch (error) {
        console.log("Error during sign-in:", error);
      }
    } else {
      alert("Incorrect code.Please try again.");
    }
  };

  const sendVerification = async (email: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setUser((prevUser) => ({
          ...prevUser,
          email: email,
        }));
        setCode(data.code);
        setPage(2);
        setExpiry(data.expiry);
      } else {
        alert("Verification failed. Failed to send verification.");
      }
    } catch (error) {
      alert("Verification failed. Failed to send verification.");
      console.log(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>Register</CardHeader>
      <CardContent>
        <Progress
          value={Math.ceil((page * 100) / 2)}
          className="h-3 mb-6 border w-full"
        />
        {page == 1 ? (
          <EmailForm
            user={user}
            sendVerification={sendVerification}
            isLoading={loading}
          />
        ) : (
          <VerifyCodeForm
            user={user}
            setPage={setPage}
            verifyCode={verifyCode}
          />
        )}
      </CardContent>
    </Card>
  );
}
