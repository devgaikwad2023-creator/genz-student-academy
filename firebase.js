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

// --- SIGNUP / LOGIN / GOOGLE LOGIC (Same as before) ---
// (Baaki ka signup/login/google code jo tumhare paas tha waisa hi niche rehne dena)
