// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsoAscgiIyvfizYrVlKvSdoewHkqy2zR4",
    authDomain: "ioninks-fc412.firebaseapp.com",
    projectId: "ioninks-fc412",
    storageBucket: "ioninks-fc412.appspot.com",
    messagingSenderId: "500568978645",
    appId: "1:500568978645:web:cf5b976e9770b25ec69e5c",
    measurementId: "G-WKQX14S480"
  }; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();


export { auth, db, storage, provider };