"use client";

import { authClient } from "@/lib/auth-client";
import { error } from "better-auth/api";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegisterFunc = async (data) => {
    console.log(data);
    const { email, name, photo, password } = data;

    const { data: res, error } = await authClient.signUp.email({
      name: name, // required
      email: email, // required
      password: password, // required
      image: photo,
      callbackURL: "/",
    });
    console.log(res, error);
    if (error) {
      alert(error.message);
    }
    if (res) {
      alert("Signup Successful");
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center mx-auto">
      <form
        onSubmit={handleSubmit(handleRegisterFunc)}
        className="bg-slate-100 p-15 rounded-xl"
      >
        <h2 className="font-semibold text-3xl text-center">
          Register Your Account
        </h2>
        <fieldset className="fieldset ">
          <label className="label mt-4">Your Name</label>
          <input
            type="text"
            className="input"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter Your name"
          />
          {errors.name && (
            <p className="text-red-600"> {errors.name.message}</p>
          )}

          <label className="label mt-4">Photo URL</label>
          <input
            type="text"
            className="input"
            {...register("photo", { required: "Photo is required" })}
            placeholder="Enter Your photo URL"
          />
          {errors.photo && (
            <p className="text-red-600"> {errors.photo.message}</p>
          )}

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

          <fieldset className="relative">
            <label className="label mt-4">Password</label>
            <input
              type={isShowPassword ? "text" : "password"}
              className="input"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
            />
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute right-6 mt-3"
            >
              {isShowPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </fieldset>

          <button className="btn btn-neutral mt-4">Register</button>
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

export default RegisterPage;
