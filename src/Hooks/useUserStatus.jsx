import { useEffect, useState } from "react";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";

const useUserStatus = () => {
  const [userIsVerified, setUserIsVerified] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setUserIsVerified(true);
        return;
      } else {
        setUserIsVerified(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return { userIsVerified };
};

export default useUserStatus;
