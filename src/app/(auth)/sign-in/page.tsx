import Link from "next/link";
import { FC } from "react";

import UserAuthForm from "@/components/UserAuthForm";


const SignIn = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        {/* <Icons.logo className='mx-auto h-6 w-6' /> */}
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a BPGC Marketplace account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
      <UserAuthForm /> 
      <p className="px-8 text-center text-sm text-muted-foreground">
        New to BPGC Marketplace ?{" "}
        <Link
          href="/sign-up"
          className="hover:text-brand text-sm underline underline-offset-4"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

const page: FC = () => {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <SignIn />
      </div>
    </div>
  );
};

export default page;
