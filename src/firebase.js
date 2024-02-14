import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDYYE09pKJgIzskIqxCdAhDOOdOUoCWJfY",
  authDomain: "demorealtime-d1e78.firebaseapp.com",
  projectId: "demorealtime-d1e78",
  storageBucket: "demorealtime-d1e78.appspot.com",
  messagingSenderId: "164842141378",
  appId: "1:164842141378:web:146bf476288c1d66796d5b",
  measurementId: "G-GE5RHNVS1X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);

export {db,auth,storage};