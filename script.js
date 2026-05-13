import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

console.log("TESTING NEW CODE - v2");
console.log("Genz Student Academy Loaded Successfully");

/* --- SMART NAVBAR & SESSION CHECK --- */
onAuthStateChanged(auth, (user) => {
    const navLogin = document.getElementById("nav-login");
    const navDashboard = document.getElementById("nav-dashboard");

    if (user) {
        console.log("Bhai Login hai! Showing Dashboard.");
        
        // 1. Dashboard dikhao
        if (navDashboard) navDashboard.style.display = "block";
        
        // 2. Login button chhupao
        if (navLogin) navLogin.style.display = "none";

    } else {
        console.log("Bhai Logout hai! Showing Login Button.");
        
        // 1. Dashboard chhupao
        if (navDashboard) navDashboard.style.display = "none";
        
        // 2. Login button dikhao
        if (navLogin) navLogin.style.display = "block";
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

/* --- CHATBOT LOGIC --- */
window.toggleChat = function() {
    let chat = document.getElementById('ai-chat-container');
    if (chat) {
        chat.style.display = (chat.style.display === 'none' || chat.style.display === '') ? 'flex' : 'none';
    }
}

window.sendMessage = function() {
    const input = document.getElementById('user-input');
    const box = document.getElementById('chat-box');
    if (!input || !box) return;

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
