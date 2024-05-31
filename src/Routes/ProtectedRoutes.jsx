import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useUserStatus from "../Hooks/useUserStatus";

const ProtectedRoutes = () => {
  const { userIsLoggedin, isLoading } = useUserStatus().userIsVerified;
  // userIsLoggedin ?
  // : <Navigate to={"/sign-in"} />
  return <Outlet />;
};

export default ProtectedRoutes;
