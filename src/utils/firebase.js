// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANU2jaDEouAoY5NlOaTVA5HIBcsn_PqUs",
  authDomain: "netflix-gpt-9766c.firebaseapp.com",
  projectId: "netflix-gpt-9766c",
  storageBucket: "netflix-gpt-9766c.appspot.com",
  messagingSenderId: "473719063842",
  appId: "1:473719063842:web:6c72f8f255ba373794d17b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  

export const auth = getAuth();
