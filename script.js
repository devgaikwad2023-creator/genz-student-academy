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

function sendMessage() {
    let input = document.getElementById('user-input');
    let chatBox = document.getElementById('chat-box');
    
    if (input.value.trim() !== "") {
        // User Message
        let userDiv = document.createElement('div');
        userDiv.className = 'user-msg';
        userDiv.innerText = input.value;
        chatBox.appendChild(userDiv);
        
        // Simple Bot Response (Wait 1 sec)
        setTimeout(() => {
            let botDiv = document.createElement('div');
            botDiv.className = 'bot-msg';
            botDiv.innerText = "I'm processing your doubt about: " + input.value + ". Please wait a moment!";
            chatBox.appendChild(botDiv);
            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);
        
        input.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}
