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

const firebaseConfig = {
  apiKey: "AIzaSyCeUJEVaKFNIgyroHAy_MFbx5Yv9POmUcQ",
  authDomain: "genz-student-academy.firebaseapp.com",
  projectId: "genz-student-academy",
  storageBucket: "genz-student-academy.firebasestorage.app",
  messagingSenderId: "358103651695",
  appId: "1:358103651695:web:b087ba14d01a6ba751049a",
  measurementId: "G-XJH4TKVQZW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, db, provider };

// --- SIGNUP SYSTEM ---
window.handleSignup = (e) => {
  e.preventDefault();
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Account Created Successfully 🚀");
      window.location.href = "login.html";
    })
    .catch((error) => alert(error.message));
};

// --- LOGIN SYSTEM ---
window.handleLogin = (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login Successful 😎");
      window.location.href = "dashboard.html";
    })
    .catch((error) => alert(error.message));
};

// --- SIGNUP / LOGIN / GOOGLE LOGIC (Same as before) ---
// (Baaki ka signup/login/google code jo tumhare paas tha waisa hi niche rehne dena)
