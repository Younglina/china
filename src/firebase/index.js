// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh9am5KlipnLKHf9s9STFJTfrbtBc5L14",
  authDomain: "younglina-76b15.firebaseapp.com",
  projectId: "younglina-76b15",
  storageBucket: "younglina-76b15.appspot.com",
  messagingSenderId: "624521869667",
  appId: "1:624521869667:web:3828d2bf7f8fb45050bb56",
  measurementId: "G-4W2JTHLB4H",
  // databaseURL: "https://younglina-76b15-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);