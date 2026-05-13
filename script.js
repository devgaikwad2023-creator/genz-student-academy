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
