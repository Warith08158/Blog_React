import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";

const UserDetailsContext = createContext();

const useUserDetailsContext = () => useContext(UserDetailsContext);

const UserDetailsProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user.emailVerified) {
        const uid = user.uid;
        console.log(uid);
        setIsLoading(false);

        // ...
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <UserDetailsContext.Provider value={{}}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export { useUserDetailsContext, UserDetailsProvider };
