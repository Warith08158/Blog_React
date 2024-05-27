import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const links = [
  {
    to: "Dashboard",
    path: "/protected-route/user-dashboard",
  },

  {
    to: "Blog",
    path: "/",
  },

  {
    to: "Inbox",
  },

  {
    to: "Users",
  },

  {
    to: "Products",
  },

  {
    to: "Sign In",
    path: "/sign-in",
  },

  {
    icon: (
      <svg
        className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
        <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
        <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
      </svg>
    ),
    to: "Sign Up",
    path: "/sign-up",
  },
];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation().pathname;
  const handleImageLoad = () => {
    setLoading(false);
  };
  return (
    <nav className="sticky top-0 z-40 w-full bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 mx-auto">
      <div className="px-3 py-3 lg:px-5 lg:pl-3 max-w-[1280px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setOpenMenu((prev) => !prev)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <div className="hidden sm:flex ms-2 md:me-24">
              <Logo />
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user photo"
                    onLoad={handleImageLoad}
                    style={{ display: loading ? "none" : "block" }}
                  />
                  {loading && (
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 animate-pulse"></div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openMenu && (
        <div className="sm:hidden sticky top-0" id="navbar-hamburger">
          <div className="px-3 py-3 lg:px-5 lg:pl-3 max-w-[1280px] mx-auto">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              {links.map((link) => (
                <li onClick={() => setOpenMenu(false)} key={link.to}>
                  <Link
                    onClick={() => setOpenMenu(false)}
                    to={link.path}
                    href="#"
                    className={`${
                      location === link.path
                        ? "bg-primary-600 text-white "
                        : "hover:bg-gray-100 text-gray-900"
                    } block py-2 px-3 rounded`}
                    aria-current="page"
                  >
                    {link.to}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
