import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase";
const useUserStatus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    createdAt: "",
    posts: 0,
    comments: 0,
  });
  const navigate = useNavigate();

  const { name, email, createdAt } = userDetails;
  useEffect(() => {
    const getVerifiedUser = async (uid) => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      const { seconds, nanoseconds } = docSnap.data().createdAt;

      function dateAccountCreated() {
        // Convert nanoseconds to milliseconds
        const milliseconds = nanoseconds / 1000000;

        // Create a Date object using the seconds and milliseconds
        const date = new Date(seconds * 1000 + milliseconds);

        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
        const day = String(date.getUTCDate()).padStart(2, "0");
        const hours = String(date.getUTCHours()).padStart(2, "0");
        const minutes = String(date.getUTCMinutes()).padStart(2, "0");

        // Format the date and time as YYYY-MM-DD HH:MM
        const formattedDateTime = `${year}-${month}-${day}`;
        return formattedDateTime;
      }

      setUserDetails({
        ...userDetails,
        name: docSnap.data().name,
        email: docSnap.data().email,
        createdAt: dateAccountCreated(),
      });
      setIsLoading(false);
    };

    onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        const uid = user.uid;
        getVerifiedUser(uid);
        return;
      } else {
        navigate("/sign-in");
        setIsLoading(false);
      }
    });
  }, []);

  return [isLoading, userDetails];
};

export default useUserStatus;
