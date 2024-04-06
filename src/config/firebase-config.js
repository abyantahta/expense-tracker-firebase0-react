// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT5FTH6mq2qqd1fPUfBBWP6NmROYBKrMA",
  authDomain: "expense-tracker-a8b75.firebaseapp.com",
  projectId: "expense-tracker-a8b75",
  storageBucket: "expense-tracker-a8b75.appspot.com",
  messagingSenderId: "920889565784",
  appId: "1:920889565784:web:7604c109c6894d7124e02d",
  measurementId: "G-G6C0665F5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
// const analytics = getAnalytics(app);