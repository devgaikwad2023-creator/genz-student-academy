// Import Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase Config

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

const auth = getAuth(app);

console.log("Firebase Connected Successfully");

// SIGNUP SYSTEM

const signupForm = document.getElementById("signup-form");

if (signupForm) {

  signupForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const email =
      document.getElementById("signup-email").value;

    const password =
      document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)

      .then((userCredential) => {

        alert("Account Created Successfully 🚀");

        window.location.href = "login.html";

      })

      .catch((error) => {

        alert(error.message);

      });

  });

}

// LOGIN SYSTEM

const loginForm = document.getElementById("login-form");

if (loginForm) {

  loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const email =
      document.getElementById("email").value;

    const password =
      document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)

      .then((userCredential) => {

        alert("Login Successful 😎");

        window.location.href = "dashboard.html";

      })

      .catch((error) => {

        alert(error.message);

      });

  });

}
