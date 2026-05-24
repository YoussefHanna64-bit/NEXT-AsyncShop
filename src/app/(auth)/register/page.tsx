"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/actions/register";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setServerError("");

    const result = await registerUser(data);

    if (result.error) {
      setServerError(result.error);
      setIsLoading(false);
      return;
    }

    const loginResult = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (loginResult?.error) {
      setServerError("Account created, but failed to log in automatically.");
      setIsLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-800/40 p-8 rounded-2xl border border-gray-800">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        Create an Account
      </h1>

      {serverError && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg text-sm mb-6 text-center">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Full Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-teal-400 outline-none transition-colors"
            placeholder="Name"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">
              {String(errors.name.message)}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Email Address
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-teal-400 outline-none transition-colors"
            placeholder="email@example.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">
              {String(errors.email.message)}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-teal-400 outline-none transition-colors"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {String(errors.password.message)}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-400 text-gray-900 py-3 rounded-xl font-bold hover:bg-teal-300 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <LoaderCircle className="w-5 h-5 animate-spin" />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <p className="text-gray-400 text-center mt-6 text-sm">
        Already have an account?
        <Link href="/login" className="text-teal-400 hover:text-teal-300">
          Log in
        </Link>
      </p>
    </div>
  );
}
