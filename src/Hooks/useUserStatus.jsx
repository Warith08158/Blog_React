import { useEffect, useState } from "react";
import { auth } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";

const useUserStatus = () => {
  const [userIsVerified, setUserIsVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setUserIsVerified(user);
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
