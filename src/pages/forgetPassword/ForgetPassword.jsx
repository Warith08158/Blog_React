import React, { useRef, useState } from "react";
import ErrorAlert from "../../components/ErrorAlert";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput";
import Logo from "../../components/Logo";
import { auth, db } from "../../../Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import SucessAlert from "../../components/SucessAlert";
import { collection, getDocs, query, where } from "firebase/firestore";

const ForgetPassword = () => {
  const emailRef = useRef();
  const [retrieving, setRetrieving] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    console.log(email);
    setRetrieving(true);

    const q = query(collection(db, "users"), where("email", "==", email));
    try {
      const querySnapshot = await getDocs(q);

      const matchEmail = [];
      querySnapshot.forEach((doc) => {
        matchEmail.push({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
        });
      });

      if (matchEmail.length > 0) {
        await sendPasswordResetEmail(auth, email);
        setRetrieving(false);
        emailRef.current.value = "";
        setSucess("Link Has been sent");
        return;
      } else {
        setRetrieving(false);
        setError("Could not find your account");
      }
    } catch (error) {
      setRetrieving(false);
      setError(error.code.substring(5));
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen min-h-[550px] flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 mx-auto w-full">
        <Logo />
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Access Your Account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={onSubmit}
            >
              <FormInput
                type="email"
                name="email"
                id="email"
                placeholder="name@company.com"
                title="Email"
                reference={emailRef}
              />

              {retrieving ? (
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
                  Retrieving...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Retrieve
                </button>
              )}
              <div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/sign-up"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up here
                  </Link>
                </p>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
                  Go back to
                  <Link
                    to="/sign-in"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    {" "}
                    Sign in{" "}
                  </Link>
                  page
                </p>
              </div>
            </form>
          </div>
        </div>
        {sucess && (
          <div className="fixed right-0 top-0 md:right-4 md:top-4">
            <SucessAlert text={sucess} setSucess={setSucess} />
          </div>
        )}
        {error && (
          <div className="fixed right-0 top-0 md:right-4 md:top-4">
            <ErrorAlert text={error} setError={setError} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgetPassword;
