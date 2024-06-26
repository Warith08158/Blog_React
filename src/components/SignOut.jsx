import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import useUserStatus from "../Hooks/useUserStatus";
import Modal from "./Modal";

const SignOut = () => {
  const userIsLoggedin = useUserStatus().userIsVerified;
  const [userSignOut, setUserSignOut] = useState(false);

  const signUserOut = async () => {
    openMenu ? setOpenMenu(false) : null;
    setUserSignOut(true);
    // try {
    //   await signOut(auth);
    //   console.log("signed out sucessfully");
    // } catch (error) {
    //   console.log("there was an error");
    // }
  };

  return (
    <div>
      <button
        onClick={signUserOut}
        className="flex items-center p-2 w-full text-left text-gray-900 rounded-lg dark:text-white"
      >
        <svg
          className="flex-shrink-0 w-5 h-5 rotate-180 text-gray-500 transition duration-75 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 16"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
          />
        </svg>
        <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
      </button>
    </div>
  );
};

export default SignOut;
