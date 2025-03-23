import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API,
  authDomain: "muso-ninjas-4a5cb.firebaseapp.com",
  projectId: "muso-ninjas-4a5cb",
  storageBucket: "muso-ninjas-4a5cb.firebasestorage.app",
  messagingSenderId: "204985533986",
  appId: "1:204985533986:web:a13b33d748f182a1492c7b",
};

//init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

//timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectAuth, projectFirestore, timestamp };
