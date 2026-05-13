// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🌟 STEP 1: Firestore Library Import ki (Ye missing tha)
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const provider = new GoogleAuthProvider();

// 🌟 STEP 2: Database Initialize kiya (Ye missing tha)
const db = getFirestore(app);

console.log("Firebase & Firestore Connected Successfully 🚀");

// 🌟 STEP 3: Sab kuch Export kiya (Taaki lock kaam kare)
export { auth, db, provider };

// SIGNUP SYSTEM
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

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
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

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

// GOOGLE LOGIN SYSTEM
const googleBtn = document.getElementById("google-login");
if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        alert("Google Login Successful 🚀");
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

// PROTECTED DASHBOARD
if (window.location.pathname.includes("dashboard.html")) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      alert("Please Login First 😎");
      window.location.href = "login.html";
    }
  });
}
