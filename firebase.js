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
const db = getFirestore(app);

console.log("Firebase & Firestore Connected Successfully 🚀");

// Export settings
export { auth, db, provider };

// GLOBAL AUTH OBSERVER (Ye logout hone se rokega)
onAuthStateChanged(auth, (user) => {
  const currentPage = window.location.pathname;
  
  if (user) {
    console.log("User Logged In:", user.email);
    // Agar login hai aur galti se login/signup page par hai, toh dashboard bhejo
    if (currentPage.includes("login.html") || currentPage.includes("signup.html")) {
      window.location.href = "dashboard.html";
    }
  } else {
    console.log("User Logged Out");
    // Sirf dashboard page par hi login check karo
    if (currentPage.includes("dashboard.html")) {
      window.location.href = "login.html";
    }
  }
});

// SIGNUP SYSTEM
const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Account Created Successfully 🚀");
        window.location.href = "login.html";
      })
      .catch((error) => alert(error.message));
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
      .then(() => {
        alert("Login Successful 😎");
        window.location.href = "dashboard.html";
      })
      .catch((error) => alert(error.message));
  });
}

// GOOGLE LOGIN SYSTEM
const googleBtn = document.getElementById("google-login");
if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
      .then(() => {
        window.location.href = "dashboard.html";
      })
      .catch((error) => alert(error.message));
  });
}
