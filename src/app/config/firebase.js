// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBzGl9mgJurvSVnqsX-B_JLqxbaZeenJHE",
  authDomain: "uml-generator.firebaseapp.com",
  projectId: "uml-generator",
  storageBucket: "uml-generator.appspot.com",
  messagingSenderId: "475868892227",
  appId: "1:475868892227:web:60decb1178d75a5d1d58f6",
  measurementId: "G-HH0DRMXPRB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Export the necessary Firebase functions and services
export { auth, db, doc, setDoc, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword };
