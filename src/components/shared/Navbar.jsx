"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import userAvatar from "@/assets/user.png";
import NavLink from "./NavLink";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  console.log(user?.name);

  return (
    <div className="container mx-auto flex justify-between mt-6">
      <div>SkillSphere</div>
      <ul className="flex gap-2 items-center">
        <li>
          <NavLink href={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink href={"/about-us"}>About</NavLink>
        </li>
        <li>
          <NavLink href={"/career"}>Career</NavLink>
        </li>
      </ul>

      {isPending ? (
        <div className="flex w-1/3 justify-center items-center">
          <span className="loading loading-spinner loading-md"></span>
        </div>
      ) : user ? (
        <div className="flex gap-2 items-center">
          <h2>Hello, {user?.name}</h2>
          <Image
            src={user?.image || userAvatar}
            width={60}
            height={60}
            alt="user"
            className="rounded-full w-14 h-14"
          ></Image>

          <button
            onClick={async () => await authClient.signOut()}
            className="btn bg-gray-900 text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link href={"/login"}>
          <button>Login</button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
