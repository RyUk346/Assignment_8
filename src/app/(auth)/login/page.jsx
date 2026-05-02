"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const handleLoginFunc = async (data) => {
    console.log(data);
    const { data: res, error } = await authClient.signIn.email({
      email: data.email, // required
      password: data.password, // required
      rememberMe: true,
      callbackURL: "/",
    });
    console.log(res, error);
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center mx-auto">
      <form
        onSubmit={handleSubmit(handleLoginFunc)}
        className="bg-slate-100 p-15 rounded-xl"
      >
        <h2 className="font-semibold text-3xl text-center">
          Login Your Account
        </h2>
        <fieldset className="fieldset ">
          <label className="label mt-4">Email</label>
          <input
            type="email"
            className="input"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter Your Email"
          />

          {errors.email && (
            <p className="text-red-600"> {errors.email.message}</p>
          )}

          <div className="relative">
            <label className="label mt-4">Password</label>
            <input
              type={isShowPassword ? "text" : "password"}
              className="input "
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
            />
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute right-2 mt-3"
            >
              {isShowPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
      <p className="mt-4">
        Don't have an account?
        <Link href={"/register"} className="text-blue-500">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
