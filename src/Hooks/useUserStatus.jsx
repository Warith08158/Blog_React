import { useEffect, useState } from "react";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";

const useUserStatus = () => {
  const [userIsVerified, setUserIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user && user.emailVerified) {
        setUserIsVerified(user);
        setIsLoading(false);
        return;
      } else {
        setUserIsVerified(false);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { userIsVerified, isLoading };
};

export default useUserStatus;
