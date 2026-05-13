console.log("TESTING NEW CODE - v2");
import { auth } from "./firebase.js";
// 1. TOP PAR IMPORT
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 2. LOGOUT PREVENTER & STATE CHECK
// Ye code pakka karega ki user page badalne par logout na ho
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("Bhai, user login hai, don't logout:", user.email);
        // Yahan tum UI update kar sakte ho (e.g., Hide Login button)
    } else {
        console.log("Koi logged in nahi hai");
    }
});

// 1. Firebase Auth check karne ke liye observer
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Ye function har page load par check karega login status
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User login hai!
    console.log("User is still logged in:", user.email);
    // Yahan tum chaho toh 'Login' button ko 'Logout' mein badal sakte ho UI par
  } else {
    // User logged out hai
    console.log("No user logged in.");
  }
});
console.log("Genz Student Academy Loaded Successfully");

/* MOBILE MENU */

const menuToggle = document.getElementById("menu-toggle");

const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {

  navLinks.classList.toggle("active");

});

/* DARK MODE */

const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

});

function toggleChat() {
    let chat = document.getElementById('ai-chat-container');
    chat.style.display = (chat.style.display === 'none' || chat.style.display === '') ? 'flex' : 'none';
}

window.sendMessage = function() {
    const input = document.getElementById('user-input');
    const box = document.getElementById('chat-box');
    const msg = input.value.trim().toLowerCase();

    if (!msg) return;

    // User Message
    box.innerHTML += `<p class="user-msg" style="background: #38bdf8; color: white; padding: 10px; border-radius: 8px; margin: 5px 0; align-self: flex-end;">${input.value}</p>`;

    // Bot Response Logic
    setTimeout(() => {
        let reply = "";
        if(msg.includes("hello") || msg.includes("hi")) {
            reply = "Hey! Taiyar ho aaj ki learning ke liye?";
        } else if(msg.includes("progress")) {
            reply = "Aapka progress dashboard par live dikh raha hai!";
        } else if(msg.includes("notes")) {
            reply = "Notes aapko course player ke niche mil jayenge.";
        } else {
            reply = "Sahi sawal hai! Kya main iske baare mein aapko detail mein bataon?";
        }

        box.innerHTML += `<p class="bot-msg" style="background: #334155; color: white; padding: 10px; border-radius: 8px; margin: 5px 0;"><b>Bot:</b> ${reply}</p>`;
        box.scrollTop = box.scrollHeight;
    }, 500);

    input.value = "";
    box.scrollTop = box.scrollHeight;
}
/* --- ENROLLMENT GUARD (UPDATED) --- */
window.handleEnrollment = function(courseId) {
    const user = auth.currentUser; 

    if (!user) {
        alert("Pehle Login/Signup kijiye enroll karne ke liye!");
        window.location.href = "login.html"; 
    } else {
        console.log("User logged in! Opening Modal for:", courseId);
        // Agar user login hai, tabhi tumhara modal khulega
        if (typeof openModal === "function") {
            openModal(); 
        }
    }
}
