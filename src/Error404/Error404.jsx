import React from 'react';
import { Link } from 'react-router';
import error404 from '/error-404.png';

const Error404 = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full px-4 md:px-0">
      <h1 className="text-3xl md:text-5xl text-[#9f62f2] font-bold text-center mb-4">
        Page Not Found!
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <img src={error404} alt="404 Not Found" className="max-w-full h-[60vh] mb-6" />
      <Link
        to="/"
        className="btn btn-primary px-6 py-2 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default Error404;
