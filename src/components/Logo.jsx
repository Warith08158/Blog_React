import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="#"
      className="flex items-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white"
    >
      <img className="w-8 h-8 mr-2" src="/favicon.ico" alt="logo" />
      Blog.today
    </Link>
  );
};

export default Logo;
