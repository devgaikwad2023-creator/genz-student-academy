// Import Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your Firebase Config

const firebaseConfig = {
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeUJEVaKFNIgyroHAy_MFbx5Yv9POmUcQ",
  authDomain: "genz-student-academy.firebaseapp.com",
  projectId: "genz-student-academy",
  storageBucket: "genz-student-academy.firebasestorage.app",
  messagingSenderId: "358103651695",
  appId: "1:358103651695:web:b087ba14d01a6ba751049a",
  measurementId: "G-XJH4TKVQZW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

console.log("Firebase Connected Successfully");

// LOGIN SYSTEM

const loginForm = document.getElementById("login-form");

if(loginForm){

  loginForm.addEventListener("submit", (e)=>{

    e.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)

    .then((userCredential)=>{

      alert("Login Successful 😎");

      window.location.href = "dashboard.html";

    })

    .catch((error)=>{

      alert(error.message);

    });

  });

}
