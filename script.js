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

/* --- ENROLLMENT GUARD WITH TRANSPARENCY POPUP (LOCKED) --- */
window.handleEnrollment = function(courseId) {
    const user = auth.currentUser; 

    if (!user) {
        alert("Pehle Login/Signup kijiye enroll karne ke liye!");
        window.location.href = "login.html"; 
        return;
    }

    console.log("User logged in! Showing Transparency Disclosure first for:", courseId);

    // 1. Pehle se agar koi purana disclosure modal hai toh use remove karo
    const oldModal = document.getElementById('enroll-disclosure-modal');
    if (oldModal) oldModal.remove();

    // 2. Naya Compact Disclosure Modal Create Karna (Dynamic HTML)
    const disclosureHtml = `
      <div id="enroll-disclosure-modal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(15, 23, 42, 0.85); display: flex; justify-content: center; align-items: center; z-index: 999999; font-family: 'Poppins', sans-serif; backdrop-filter: blur(6px);">
        <div style="background: #1e293b; color: #ffffff; max-width: 460px; width: 90%; padding: 18px 22px; border-radius: 12px; border: 1px solid #334155; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); text-align: left; box-sizing: border-box;">
          <h2 style="color: #38bdf8; font-size: 1.15rem; margin-top: 0; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            Important Disclosure: Our Commitment to Knowledge 🎓
          </h2>
          <p style="font-size: 0.82rem; color: #cbd5e1; margin-bottom: 10px; line-height: 1.4;">
            Please review our transparency notice before proceeding with the payment enrollment:
          </p>
          
          <ul style="padding-left: 15px; color: #cbd5e1; font-size: 0.78rem; margin-bottom: 12px; line-height: 1.4;">
            <li style="margin-bottom: 6px;"><strong style="color: #f8fafc;">Skill & Knowledge Focused:</strong> Our system is designed strictly to offer practical skill development and career-oriented knowledge.</li>
            <li style="margin-bottom: 6px;"><strong style="color: #f8fafc;">Certification Transparency:</strong> The certificate is an institutional token of recognition from us. Our courses are independent and not accredited by any government ministry or university.</li>
            <li style="margin-bottom: 6px;"><strong style="color: #f8fafc;">Why We Charge Fees:</strong> The nominal fees are solely used to reward our hardworking educators, cover platform maintenance, and support content operations.</li>
          </ul>

          <p style="font-size: 0.78rem; font-style: italic; color: #94a3b8; text-align: center; border-top: 1px solid #334155; padding-top: 10px; margin-bottom: 15px;">
            "Humara Mission aapko industry-ready skills sikhana hai!"
          </p>

          <button id="agree-enroll-btn" style="width: 100%; background: #38bdf8; color: #0f172a; border: none; padding: 10px; font-size: 0.9rem; font-weight: 600; border-radius: 6px; cursor: pointer; transition: background 0.2s ease; font-family: 'Poppins', sans-serif;">
            I Understand & Agree - Proceed to Pay
          </button>
        </div>
      </div>
    `;

    // 3. Modal ko page ke andar insert karna
    document.body.insertAdjacentHTML('beforeend', disclosureHtml);

    // 4. Button par click karne par disclosure band hoga aur asli QR Code Modal khulega
    document.getElementById('agree-enroll-btn').addEventListener('click', function() {
        document.getElementById('enroll-disclosure-modal').remove(); // Disclosure card band
        
        // Ab asli QR code waala modal khulega
        if (typeof openModal === "function") {
            openModal(); 
        } else {
            console.error("openModal function not found!");
        }
    });
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
