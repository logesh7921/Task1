document.getElementById('chat-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const inputText = document.getElementById('input_text').value;

    if (inputText.trim() !== '') {
        const chatBox = document.getElementById('chat-box');

        // User message
        const userMessage = document.createElement('div');
        userMessage.className = 'message user';
        userMessage.textContent = inputText;
        chatBox.appendChild(userMessage);

        // Scroll to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;

        // Clear input
        document.getElementById('input_text').value = '';

        // Fetch AI response
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `input_text=${encodeURIComponent(inputText)}`,
        });

        const result = await response.json();

        // AI response
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai';
        aiMessage.textContent = result[0];
        chatBox.appendChild(aiMessage);

        // Scroll to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
