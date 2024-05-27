import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar, Sidebar } from "../components/component";
const PageLayout = () => {
  const location = useLocation().pathname;
  return (
    <div>
      <Navbar />
      <div className="flex mx-auto max-w-[1280px]">
        {location !== "/sign-in" &&
        location !== "/sign-up" &&
        location !== "/forgetPassword" ? (
          <Sidebar />
        ) : null}
        <div className="flex-1 pt-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
