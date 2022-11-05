// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRrxzYeWkYg8Tyzkggav8wO-vdUrmtjD0",
  authDomain: "lendsqr-fp-news-3d62c.firebaseapp.com",
  projectId: "lendsqr-fp-news-3d62c",
  storageBucket: "lendsqr-fp-news-3d62c.appspot.com",
  messagingSenderId: "52981167499",
  appId: "1:52981167499:web:3fa138dd0dd15b5db56b8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth}