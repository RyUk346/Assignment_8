"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/login?redirect=/my-profile/update");
    }

    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [isPending, user, router]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const { error } = await authClient.updateUser({
      name,
      image,
    });

    if (error) {
      setErrorMessage(error.message || "Update failed");
      toast.error(error.message || "Update failed");

      return;
    }

    toast.success("Profile updated successfully");
    router.push("/my-profile");
  };

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
      <form
        onSubmit={handleUpdate}
        className="max-w-lg mx-auto bg-base-100 shadow-xl rounded-2xl p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Update Information
        </h1>

        {errorMessage && (
          <p className="alert alert-error mb-4">{errorMessage}</p>
        )}

        <label className="label">Name</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label className="label mt-4">Image URL</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <button className="btn bg-purple-600 text-white w-full mt-6">
          Update Information
        </button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
