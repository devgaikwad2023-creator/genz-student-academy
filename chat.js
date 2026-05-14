// Global AI Chatbot Logic for Genz Student Academy
const GROQ_API_KEY = "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";

window.toggleChat = function() {
    const chatContainer = document.getElementById('ai-chat-container');
    if (chatContainer.classList.contains('chat-closed')) {
        chatContainer.classList.remove('chat-closed');
        chatContainer.classList.add('chat-open');
        chatContainer.style.display = 'flex';
    } else {
        chatContainer.classList.remove('chat-open');
        chatContainer.classList.add('chat-closed');
        chatContainer.style.display = 'none';
    }
};

window.sendMessage = async function() {
    const input = document.getElementById('user-input');
    const box = document.getElementById('chat-box');
    const userMsg = input.value.trim();

    if (!userMsg) return;

    // User message display
    box.innerHTML += `<p class="user-msg" style="background: #0ea5e9; color: white; padding: 10px; border-radius: 8px; margin: 5px 0; align-self: flex-end; max-width: 80%; font-size: 14px;">${userMsg}</p>`;
    
    const typingId = "typing-" + Date.now();
    box.innerHTML += `<p id="${typingId}" class="bot-msg" style="background: #334155; color: white; padding: 10px; border-radius: 8px; margin: 5px 0; align-self: flex-start; max-width: 80%; font-size: 14px;">Thinking... ⚡</p>`;
    
    input.value = '';
    box.scrollTop = box.scrollHeight;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [
                    { role: "system", content: "You are a helpful and witty study assistant for 'Genz Student Academy'. Answer clearly and keep it engaging." },
                    { role: "user", content: userMsg }
                ]
            })
        });

        const data = await response.json();
        const aiText = data.choices[0].message.content;

        document.getElementById(typingId).remove();
        box.innerHTML += `<p class="bot-msg" style="background: #334155; color: white; padding: 10px; border-radius: 8px; margin: 5px 0; align-self: flex-start; max-width: 80%; font-size: 14px;"><b>Bot:</b> ${aiText}</p>`;
    } catch (error) {
        if(document.getElementById(typingId)) document.getElementById(typingId).remove();
        box.innerHTML += `<p class="bot-msg" style="background: #ef4444; color: white; padding: 10px; border-radius: 8px; margin: 5px 0; align-self: flex-start;">Error connecting to AI!</p>`;
    }
    box.scrollTop = box.scrollHeight;
};

// Enter key support
document.getElementById('user-input')?.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') window.sendMessage();
});
