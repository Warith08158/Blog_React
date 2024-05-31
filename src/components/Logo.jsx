import React from "react";
import { Link } from "react-router-dom";
import { FaBlog } from "react-icons/fa";

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center md sm:text-xl font-semibold text-gray-900 dark:text-white"
    >
      <FaBlog className="w-4 h-4 sm:w-6 sm:h-6 mr-2 text-primary-600" />
      Blog.<span className="text-gray-500">today</span>
    </Link>
  );
};

export default Logo;
