/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrghVmv9XiTcJiFnnt08lzDwniifq_zuo",
  authDomain: "movix-a6d74.firebaseapp.com",
  projectId: "movix-a6d74",
  storageBucket: "movix-a6d74.firebasestorage.app",
  messagingSenderId: "984355686001",
  appId: "1:984355686001:web:12a9e80630917f6e50fdd0",
  measurementId: "G-P8XD7C1ZZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();