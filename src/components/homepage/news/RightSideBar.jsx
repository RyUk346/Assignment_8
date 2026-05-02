import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const RightSideBar = () => {
  return (
    <div>
      <h2 className="font-bold text-lg">Login With</h2>
      <div className="flex flex-col gap-2 mt-6">
        <button className="btn border-blue-500 text-blue-500">
          <FaGoogle /> Login with google
        </button>
        <button className="btn">
          <FaGithub /> Login with github
        </button>
      </div>
    </div>
  );
};

export default RightSideBar;
