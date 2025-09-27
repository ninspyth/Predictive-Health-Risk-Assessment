"use client";

import * as React from "react";
import bgImage from "../../public/assets/bg.jpg";

import NavbarMenu from "@/components/Navigation/NavBar";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Chat from "@/components/Chat/Chat";

export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  const openChat = () => {
    const email = localStorage.getItem("email");
    if (!email) {
      alert("Please login");
      router.push("/login");
    }
  };
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgImage.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        <NavbarMenu></NavbarMenu>
        <div className="ml-25 mt-50 flex flex-col text-white">
          <div className="flex flex-col">
            <h5 className="text-5xl">AI-Powered Health Risk Predictor</h5>
            <h1 className="text-2xl">
              Predict Your Health. Protect Your Future.
            </h1>
          </div>

          <div className="mt-10 ml-5">
            <ul className="list-disc">
              <li>Personalized Health Risk Assessments</li>
              <li>AI-powered Recommendations</li>
              <li>Health Monitoring Dashboard</li>
              <li>Secure & Private Data Handling</li>
            </ul>
          </div>

          <div className="mt-10 ml-5 flex items-center text-lg">
            <span>Wan&apos;t to know more about our Product?</span>
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-8 inline m-4 animate-pulse"
                    onClick={openChat}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-sky-200">
                  <DialogTitle></DialogTitle>
                  <Chat />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}
