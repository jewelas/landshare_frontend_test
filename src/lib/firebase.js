// IMPORT THE FUNCTIONS YOU NEED FROM THE SDK'S YOU NEED
import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// TODO: ADD SDK FOR FIREBASE PRODUCTS THAT YOU WANT TO USE
import { getFirestore } from "firebase/firestore/lite";

// YOUR WEB APP'S FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyBjrzJ0FSNpeFxeeB-8ZmfNPIQ0HceEnNw",
  authDomain: "landshare-28977.firebaseapp.com",
  projectId: "landshare-28977",
  storageBucket: "landshare-28977.appspot.com",
  messagingSenderId: "644674595145",
  appId: "1:644674595145:web:b72e453f72272dc602d298",
  measurementId: "G-BLF8H8PN8W",
};

// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
