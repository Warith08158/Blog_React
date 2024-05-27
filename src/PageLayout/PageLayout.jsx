import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../components/component";
const PageLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex mx-auto max-w-[1280px]">
        <Sidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
