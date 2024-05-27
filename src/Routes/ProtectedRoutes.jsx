import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStatus from "../Hooks/useUserStatus";

const ProtectedRoutes = () => {
  const userIsLoggedin = useUserStatus().userIsVerified;

  return userIsLoggedin ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default ProtectedRoutes;
