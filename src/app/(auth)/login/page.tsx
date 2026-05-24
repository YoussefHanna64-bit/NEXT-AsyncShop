"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 chars" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    setServerError("");

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      setServerError(result.error || "Failed to sign in.");
      return;
    }

    router.push("/");
  };

  return (
    <div className="flex flex-1 items-center justify-center p-8 mt-10 w-full">
      <div className="w-full max-w-md bg-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Sign in to AsyncShop to continue.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mb-8">
          {serverError && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-4 text-center">
              {serverError}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-400 transition-colors"
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-teal-400 transition-colors"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-teal-400 text-gray-900 font-bold py-3 rounded-lg hover:bg-teal-300 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">
            Or continue with
          </span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Image
            src="https://authjs.dev/img/providers/google.svg"
            alt="Google Logo"
            width={20}
            height={20}
            className="object-contain"
          />
          Sign in with Google
        </button>

        <button
          onClick={() => signIn("facebook", { callbackUrl: "/" })}
          className="my-4 w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Image
            src="https://authjs.dev/img/providers/facebook.svg"
            alt="Facebook Logo"
            width={20}
            height={20}
            className="object-contain"
          />
          Sign in with Facebook
        </button>

        <p className="mx-8 text-center text-sm text-gray-400">
          Don't have an account?
          <Link href="/register" className="text-teal-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
