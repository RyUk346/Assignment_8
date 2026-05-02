"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  if (!href) return null;
  const isActive = href === pathname;

  return (
    <div>
      <Link
        href={href}
        className={`${isActive ? "bg-purple-500 text-white p-2 rounded-lg" : ""}`}
      >
        {children}
      </Link>
    </div>
  );
};

export default NavLink;
