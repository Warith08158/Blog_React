import React, { useState } from "react";
import Logo from "./Logo";
import Menu from "./Menu";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleImageLoad = () => {
    setLoading(false);
  };
  return (
    <nav className="fixed z-30 top-0 w-full bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 mx-auto">
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
        <div className="sm:hidden" id="Menu">
          <div className="max-w-[1280px] mx-auto">
            <div onClick={() => (openMenu ? setOpenMenu(false) : null)}>
              <Menu />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
