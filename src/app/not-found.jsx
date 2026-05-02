import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-7xl font-bold text-purple-600">404</h1>
      <h2 className="text-3xl font-bold mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2">
        The page you are looking for does not exist.
      </p>

      <Link href="/">
        <button className="btn bg-purple-600 text-white mt-6">
          Back to Home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
