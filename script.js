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

/* --- SECURE PAYMENT VERIFICATION SYSTEM --- */
window.verifyPayment = function() {
    const user = auth.currentUser;

    if (!user) {
        alert("Pehle Login/Signup kijiye enroll karne ke liye!");
        window.location.href = "login.html";
        return;
    }

    // Modal se course ka naam uthane ke liye
    const courseNameElement = document.getElementById('modal-price');
    const courseName = courseNameElement ? courseNameElement.innerText : "Unknown Course";

    // Google Sheet ke liye data tayyar karna (Firebase Auth se real details)
    const paymentData = {
        fullName: user.displayName || "Genz Student",
        email: user.email,
        course: courseName
    };

    // Button ko double-click se bachane ke liye disable karna
    const paidButton = document.querySelector('.verify-btn');
    if (paidButton) {
        paidButton.disabled = true;
        paidButton.innerText = "Processing...";
    }

    // Aapka Google Apps Script Web App URL
    const scriptUrl = "https://script.google.com/macros/s/AKfycbxR7y4zBy0r4hhqUb1KKlw-g0Vz275yR8fVT3-x6-3muU0mU0tLnVOceFiuNls-ruj9AQ/exec";

    fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors", // Google Apps Script ke liye strictly required
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentData)
    })
    .then(() => {
        // Data sheet mein jaane ke baad alert pop-up
        alert("Verification in progress! Our team will grant access within 30 mins.");
        
        // Modal close karke bache ko dashboard par bhejna
        if (typeof closeModal === "function") {
            closeModal();
        }
        window.location.href = "dashboard.html";
    })
    .catch(error => {
        console.error("Error submitting payment:", error);
        alert("Something went wrong. Please try again or contact support.");
        if (paidButton) {
            paidButton.disabled = false;
            paidButton.innerText = "I have Paid - Access Course";
        }
    });
}
