import { UserRegistrationForm } from "@/components/Authentication/user-registration-form";
import Loader from "@/components/Loader/loader";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <>
      <Suspense fallback={<Loader isLoading={true} />}>
        <div className="container w-full flex items-center justify-center">
          <UserRegistrationForm />
        </div>
      </Suspense>
    </>
  );
}
