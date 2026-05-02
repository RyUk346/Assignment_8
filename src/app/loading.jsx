import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex h-[85vh] items-center justify-center">
      <h2>Global Loading</h2>
      <span className="loading loading-dots loading-xl"></span>
    </div>
  );
};

export default LoadingPage;
