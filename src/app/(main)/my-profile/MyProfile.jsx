"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import userAvatar from "@/assets/user.png";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MyProfileComponent = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login?redirect=/my-profile");
    }
  }, [isPending, user, router]);

  if (isPending) {
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-primary"></span>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-14">
      <div className="max-w-xl mx-auto card bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <Image
            src={user.image || userAvatar}
            alt={user.name || "User"}
            width={120}
            height={120}
            className="rounded-full w-28 h-28 object-cover"
          />

          <h1 className="text-3xl font-bold mt-4">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>

          <Link href="/my-profile/update">
            <button className="btn bg-purple-600 text-white mt-6">
              Update Information
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfileComponent;
