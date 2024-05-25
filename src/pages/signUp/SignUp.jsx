import React, { useEffect, useRef, useState } from "react";
import {
  ErrorAlert,
  FormInput,
  Google,
  Logo,
} from "../../components/component";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../Firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [error, setError] = useState(false);
  const [creatingAccount, setCreatingAccount] = useState(false);
  const navigate = useNavigate();
  const userNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const userName = userNameRef.current.value;
    const userEmail = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const data = {
      name: userName,
      email: userEmail,
    };

    if (
      userName.length < 10 ||
      userName.length > 20 ||
      !userEmail.includes("@") ||
      !userEmail.includes(".") ||
      password.length < 6 ||
      password.length > 10 ||
      confirmPassword !== password
    )
      return setError("There was an error in the form. See requirements below");
    setError(false);

    setCreatingAccount(true);
    //upload user details to firebase
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      await setDoc(doc(db, "users", user.user.uid), data);
      await sendEmailVerification(auth.currentUser);
      setCreatingAccount(false);
      navigate("/confirm-account");
    } catch (error) {
      setCreatingAccount(false);
      setError(error.code.substring(5));
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen min-h-[900px] flex flex-col items-stretch justify-center">
      <div className="flex flex-col items-center justify-center px-6 mx-auto mt-6 w-full">
        <Logo />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <FormInput
                type="text"
                name="userName"
                id="userName"
                placeholder="your name"
                title="Name"
                reference={userNameRef}
              />

              <FormInput
                type="email"
                name="email"
                id="email"
                placeholder="name@company.com"
                title="Email"
                reference={emailRef}
              />

              <FormInput
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                title="Password"
                reference={passwordRef}
              />

              <FormInput
                type="confirm-password"
                name="confirm-password"
                id="confirmPassword"
                placeholder="••••••••"
                title="Confirm Password"
                reference={confirmPasswordRef}
              />

              {creatingAccount ? (
                <button
                  disabled
                  type="button"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Creating account...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
              )}
              <Google />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <div
        className="flex p-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 mt-6"
        role="alert"
      >
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">
            Ensure that these requirements are met:
          </span>
          <ul className="mt-1.5 list-disc list-inside">
            <li>Name: At least 10 characters (and up to 20 characters)</li>
            <li>Email: use a valid Email</li>
            <li>Password: Atleast 6 characters (and up to 10 characters)</li>
            <li>Password must match</li>
          </ul>
        </div>
        {error && (
          <div className="fixed right-0 top-0 md:right-4 md:top-4">
            <ErrorAlert text={error} setError={setError} />
          </div>
        )}
      </div>
    </section>
  );
};

export default SignUp;
