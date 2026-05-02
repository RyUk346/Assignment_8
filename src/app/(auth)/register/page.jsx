"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegisterFunc = async (data) => {
    setErrorMessage("");

    const { email, name, photo, password } = data;

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photo,
      callbackURL: "/login",
    });

    if (error) {
      setErrorMessage(error.message || "Registration failed");
      return;
    }

    alert("Signup Successful");
    router.push("/login");
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center mx-auto px-4">
      <form
        onSubmit={handleSubmit(handleRegisterFunc)}
        className="bg-slate-100 p-8 md:p-12 rounded-xl w-full max-w-md"
      >
        <h2 className="font-semibold text-3xl text-center">
          Register Your Account
        </h2>

        {errorMessage && (
          <p className="alert alert-error mt-4">{errorMessage}</p>
        )}

        <fieldset className="fieldset">
          <label className="label mt-4">Your Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter Your name"
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}

          <label className="label mt-4">Photo URL</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("photo", { required: "Photo is required" })}
            placeholder="Enter Your photo URL"
          />
          {errors.photo && (
            <p className="text-red-600">{errors.photo.message}</p>
          )}

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

          <fieldset className="relative">
            <label className="label mt-4">Password</label>
            <input
              type={isShowPassword ? "text" : "password"}
              className="input input-bordered w-full"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
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
          </fieldset>

          <button className="btn bg-gray-900 text-white mt-4 w-full">
            Register
          </button>
        </fieldset>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full mt-3"
        >
          <FaGoogle /> Register with Google
        </button>
      </form>

      <p className="mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 font-semibold">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
