// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlIMS8oOGWsl-ckG4Vs8EU4uXYqsyC48o",
  authDomain: "user-email-password-auth-3a65a.firebaseapp.com",
  projectId: "user-email-password-auth-3a65a",
  storageBucket: "user-email-password-auth-3a65a.firebasestorage.app",
  messagingSenderId: "654671234642",
  appId: "1:654671234642:web:4856b41738b25b0d08418b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;