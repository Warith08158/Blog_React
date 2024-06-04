// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtKlKBwCnj_fORFY0s5t2OCzId7sdSls4",
  //"AIzaSyCtKlKBwCnj_fORFY0s5t2OCzId7sdSls4"
  // import.meta.env.REACT_APP_API_KEY
  authDomain: "blog-react-2e253.firebaseapp.com",
  // "blog-react-2e253.firebaseapp.com"
  // import.meta.env.REACT_APP_AUTH_DOMAIN
  projectId: "blog-react-2e253",
  //"blog-react-2e253"
  // import.meta.env.REACT_APP_PROJECT_ID
  storageBucket: "blog-react-2e253.appspot.com",
  //"blog-react-2e253.appspot.com"
  // import.meta.env.REACT_APP_STORAGE_BUCKET
  messagingSenderId: "1091238634977",
  //"1091238634977"
  // import.meta.env.REACT_APP_MESSAGING_SENDER_ID
  appId: "1:1091238634977:web:bca4df4cc82a3e18c51ea0",
  //"1:1091238634977:web:bca4df4cc82a3e18c51ea0"
  // import.meta.env.REACT_APP_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

//create user with email and password
export const createAccount = async (userEmail, userName, password) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      password
    );
    if (!user) throw Error("Account not created");
    const data = {
      name: userName,
      email: userEmail,
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", user.user.uid), data);
    await sendEmailVerification(auth.currentUser);
  } catch (error) {
    throw new Error(error);
  }
};

//sign in with email and password
export const signIn = async (userEmail, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userEmail,
      password
    );
    if (!userCredential.user.emailVerified) throw Error("user is not verified");
  } catch (error) {
    throw new Error(error);
  }
};

//continue with google
const provider = new GoogleAuthProvider();
export const continueWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const userId = result.user.uid;
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      const data = {
        name: result.user.displayName,
        email: result.user.email,
        createdAt: serverTimestamp(),
      };
      await setDoc(doc(db, "users", userId), data);
    }
  } catch (error) {
    throw new Error(error);
  }
};
