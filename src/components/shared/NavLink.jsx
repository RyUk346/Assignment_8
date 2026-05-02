"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-lg font-medium transition ${
        isActive
          ? "bg-purple-600 text-white"
          : "text-gray-700 hover:bg-purple-100 hover:text-purple-700"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
