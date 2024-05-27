import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar, Menu } from "../components/component";
const PageLayout = () => {
  const location = useLocation().pathname;
  return (
    <>
      <Navbar />
      <div className="flex mx-auto max-w-[1280px]">
        <div className="hidden sm:block">
          <Menu />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default PageLayout;
