document.addEventListener('DOMContentLoaded', () => {
    const chatDisplay = document.getElementById('chatDisplay');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') {
            return;
        }

        // Display user message
        appendMessage('user', message);

        // Clear input
        messageInput.value = '';

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Display Gemini's reply
            appendMessage('bot', data.reply);

        } catch (error) {
            console.error('Error sending message:', error);
            appendMessage('bot', 'Error: Could not get a response from the bot.');
        } finally {
            // Scroll to the bottom of the chat
            chatDisplay.scrollTop = chatDisplay.scrollHeight;
        }
    }

    function appendMessage(sender, text) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        chatDisplay.appendChild(messageElement);
    }
});