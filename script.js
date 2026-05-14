import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

console.log("TESTING NEW CODE - v2");
console.log("Genz Student Academy Loaded Successfully");

// --- NEW AUTH LOGIC ---
onAuthStateChanged(auth, (user) => {
    const loginBtn = document.getElementById("login-btn");
    const dashboardBtn = document.getElementById("dashboard-btn");

    if (user) {
        if (loginBtn) loginBtn.style.display = "none";
        if (dashboardBtn) dashboardBtn.style.display = "inline-block";
    } else {
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (dashboardBtn) dashboardBtn.style.display = "none";
    }
});

/* --- MOBILE MENU --- */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

/* --- DARK MODE --- */
const darkModeToggle = document.getElementById("dark-mode-toggle");
if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
}

/* --- ENROLLMENT GUARD (LOCKED) --- */
window.handleEnrollment = function(courseId) {
    const user = auth.currentUser; 

    if (!user) {
        alert("Pehle Login/Signup kijiye enroll karne ke liye!");
        window.location.href = "login.html"; 
    } else {
        console.log("User logged in! Opening Modal for:", courseId);
        if (typeof openModal === "function") {
            openModal(); 
        }
    }
}
