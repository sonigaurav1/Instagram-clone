import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-dvh">
      <p className="mb-2">No page found</p>
      <Link className="bg-blue-500 px-4 py-2 text-white rounded-lg" to="/">
        Go Back
      </Link>
    </div>
  );
};

export default ErrorPage;
