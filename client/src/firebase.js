// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-df90a.firebaseapp.com",
  projectId: "real-estate-df90a",
  storageBucket: "real-estate-df90a.appspot.com",
  messagingSenderId: "875524990824",
  appId: "1:875524990824:web:810a2cb6ebcfd9bb5558dd",
  measurementId: "G-EP11MKSSY2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
