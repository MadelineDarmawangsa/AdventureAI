// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvGLxrPjF9l-CHjs3YJRenkqE4z6jaB64",
  authDomain: "adventureai-678bb.firebaseapp.com",
  projectId: "adventureai-678bb",
  storageBucket: "adventureai-678bb.appspot.com",
  messagingSenderId: "802832032444",
  appId: "1:802832032444:web:ed73cb45bce85878d926b9",
  measurementId: "G-BGG2CRDZ4H"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

function register() {
  
}