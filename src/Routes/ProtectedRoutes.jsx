import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";

const ProtectedRoutes = () => {
  const [isVerified, setIsVerified] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setIsVerified(true);
      } else {
        setIsVerified(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return isVerified ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default ProtectedRoutes;
