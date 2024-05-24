import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const isAuthenticated = false;
  return isAuthenticated ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default ProtectedRoutes;
