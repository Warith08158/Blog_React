import React from "react";
import { auth } from "../../../Firebase";
import { Link, Navigate } from "react-router-dom";

const ConfirmAccount = () => {
  return auth.currentUser ? (
    <div className="flex items-center justify-center mt-48 sm:mt-56 md:mt-64 lg:mt-72">
      <div>
        <h3 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl text-center dark:text-white">
          Please Check Your Mail For Verification
        </h3>
        <p className="text-center text-lg">
          {" "}
          A verification Link has been sent to{" "}
          <span className="underline underline-offset-3 decoration-2 decoration-blue-400 dark:decoration-blue-600 text-xl font-semibold">
            {auth.currentUser.email}
          </span>
        </p>
        <p className="text-center text-md mt-3">
          Go to{" "}
          <Link
            to="/sign-in"
            className="text-center cursor-pointer font-semibold text-blue-600"
          >
            Sign in
          </Link>{" "}
          Page
        </p>
      </div>
    </div>
  ) : (
    <Navigate to="/sign-in" />
  );
};

export default ConfirmAccount;
