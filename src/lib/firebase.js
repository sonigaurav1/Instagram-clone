import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDQVT4Wil6a5tELQrM8bTUd78mLa09sqK4",
  authDomain: "instagram-clone-4a5c3.firebaseapp.com",
  projectId: "instagram-clone-4a5c3",
  storageBucket: "instagram-clone-4a5c3.appspot.com",
  messagingSenderId: "314505215772",
  appId: "1:314505215772:web:118f4852adf6fb6d1ac4d9",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {auth , db, storage}