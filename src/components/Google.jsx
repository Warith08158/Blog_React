import React, { useState } from "react";
import { auth, db } from "../../Firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import ErrorAlert from "./ErrorAlert";

const Google = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const provider = new GoogleAuthProvider();

  const submitWithGoogle = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithPopup(auth, provider);
      const userId = result.user.uid;
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        navigate("/protected-route/user-dashboard");
        setIsLoading(false);
        return;
      } else {
        const data = {
          name: result.user.displayName,
          email: result.user.email,
        };

        await setDoc(doc(db, "users", userId), data);
        navigate("/protected-route/user-dashboard");
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.code.substring(5));
    }
  };
  return isLoading ? (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-40 flex items-center justify-center bg-white/30">
      <Spinner />
    </div>
  ) : (
    <button
      type="button"
      className="text-gray-900 bg-white w-full justify-center hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
      onClick={submitWithGoogle}
    >
      <svg
        className="w-4 h-4 me-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="currentColor"
        viewBox="0 0 18 19"
      >
        <path
          fillRule="evenodd"
          d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
          clipRule="evenodd"
        />
      </svg>
      Continue with Google
      {error && (
        <div className="fixed right-0 top-20 md:right-4">
          <ErrorAlert text={error} setError={setError} />
        </div>
      )}
    </button>
  );
};

export default Google;
