"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import userAvatar from "@/assets/user.png";
import NavLink from "./NavLink";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink href="/">Home</NavLink>
            </li>
            <li>
              <NavLink href="/courses">Courses</NavLink>
            </li>
            <li>
              <NavLink href="/my-profile">My Profile</NavLink>
            </li>
          </ul>
        </div>

        <Link href="/" className="btn btn-ghost text-xl text-purple-600">
          SkillSphere
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/courses">Courses</NavLink>
          </li>
          <li>
            <NavLink href="/my-profile">My Profile</NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        {isPending ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : user ? (
          <div className="flex gap-3 items-center">
            <Image
              src={user?.image || userAvatar}
              width={48}
              height={48}
              alt="user"
              className="rounded-full w-12 h-12 object-cover"
            />

            <button
              onClick={handleLogout}
              className="btn bg-gray-900 text-white btn-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/login">
              <button className="btn btn-outline btn-sm">Login</button>
            </Link>

            <Link href="/register">
              <button className="btn bg-purple-600 text-white btn-sm">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
