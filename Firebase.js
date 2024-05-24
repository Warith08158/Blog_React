// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtKlKBwCnj_fORFY0s5t2OCzId7sdSls4",
  authDomain: "blog-react-2e253.firebaseapp.com",
  projectId: "blog-react-2e253",
  storageBucket: "blog-react-2e253.appspot.com",
  messagingSenderId: "1091238634977",
  appId: "1:1091238634977:web:bca4df4cc82a3e18c51ea0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
