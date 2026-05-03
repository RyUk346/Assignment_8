"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginFunc = async (data) => {
    setErrorMessage("");

    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: redirectPath,
    });

    if (error) {
      setErrorMessage(error.message || "Login failed");
      toast.error(error.message || "Login failed");

      return;
    }

    router.push(redirectPath);
    toast.success("Login successful");
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center mx-auto px-4 mt-4 ">
      <form
        onSubmit={handleSubmit(handleLoginFunc)}
        className="bg-slate-100 p-8 md:p-12 rounded-xl w-full"
      >
        <h2 className="font-semibold text-3xl text-center">
          Login Your Account
        </h2>

        {errorMessage && (
          <p className="alert alert-error mt-4">{errorMessage}</p>
        )}

        <fieldset className="fieldset">
          <label className="label mt-4">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter Your Email"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}

          <div className="relative">
            <label className="label mt-4">Password</label>
            <input
              type={isShowPassword ? "text" : "password"}
              className="input input-bordered w-full"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
            />

            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute right-3 top-12 cursor-pointer"
            >
              {isShowPassword ? <FaEye /> : <FaEyeSlash />}
            </span>

            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button className="btn bg-gray-900 text-white mt-4 w-full">
            Login
          </button>
        </fieldset>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full mt-3"
        >
          <FaGoogle /> Login with Google
        </button>
      </form>

      <p className="mt-4">
        Don&apos;t have an account?
        <Link href="/register" className="text-blue-500 font-semibold">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
