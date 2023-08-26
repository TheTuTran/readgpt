import { FC } from "react";
import { Icons } from "./Icons";
import Link from "next/link";
import UserAuthForm from "./UserAuthForm";

const SignIn: FC = ({}) => {
  return (
    <main className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <section className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-6 w-6" />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome Back</h1>
        <p className="text-sm max-w-xs mx-auto">
          By Continuing, you are setting up a ReadGPT account and agree to our
          user Agreement and Privacy Policy.
        </p>

        <UserAuthForm />

        <p className="px-8 text-center text-sm text-zinc-700">
          New to ReadGPT?{" "}
          <Link
            href="/sign-up"
            className="hover:text-zinc-800 text-sm underline underline-offset-4"
          >
            Sign Up
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SignIn;
