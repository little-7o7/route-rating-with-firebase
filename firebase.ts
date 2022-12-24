import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfkJwHdiF9GxNToQW86etJHW94W01tdgI",
  authDomain: "route-rating.firebaseapp.com",
  projectId: "route-rating",
  storageBucket: "route-rating.appspot.com",
  messagingSenderId: "828869132400",
  appId: "1:828869132400:web:0c4481c03ad5fe941434b5",
  measurementId: "G-0ZTQLYL4NS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore()
