import { useEffect, useState } from "react";
import { auth, db } from "../../Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const useUserStatus = () => {
  const [userIsVerified, setUserIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const fetchUserdata = async (uid) => {
        try {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          setUserIsVerified(docSnap.data());
          setIsLoading(false);
        } catch (error) {
          setIsLoading(true);
        }
      };
      if (user && user.emailVerified) {
        fetchUserdata(user.uid);
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
