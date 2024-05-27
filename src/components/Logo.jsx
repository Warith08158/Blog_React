import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center md sm:text-xl font-semibold text-gray-900 dark:text-white"
    >
      <img
        className="w-4 h-4 sm:w-6 sm:h-6 mr-2"
        src="/favicon.ico"
        alt="logo"
      />
      Blog.today
    </Link>
  );
};

export default Logo;
