// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmHxAf7AZEXy5kSn3E6jLDRV1RbAMTPW4",
  authDomain: "jeopardy-maker-dda7d.firebaseapp.com",
  projectId: "jeopardy-maker-dda7d",
  storageBucket: "jeopardy-maker-dda7d.appspot.com",
  messagingSenderId: "251436613747",
  appId: "1:251436613747:web:0e362f706f091662d72a06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);