// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realhome-941de.firebaseapp.com",
  projectId: "realhome-941de",
  storageBucket: "realhome-941de.appspot.com",
  messagingSenderId: "358653556750",
  appId: "1:358653556750:web:130a1d940487b6e0c4a45f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);