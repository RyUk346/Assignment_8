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
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/" className="text-2xl font-bold text-purple-600">
          SkillSphere
        </Link>

        <ul className="hidden md:flex gap-2 items-center">
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
