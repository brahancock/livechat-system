const socket = io('http://localhost:3030')
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

const username = prompt('What is your name?');
appendMessage('You joined');
socket.emit('new-user', username);

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`);
});
socket.on('user-connected', data => {
    appendMessage(`${data.name} connected`);
});
socket.on('user-disconnected', data => {
    appendMessage(`${data.name} disconnected`);
});

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message);
    messageInput.value='';
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.style.backgroundColor = 'red';
    messageContainer.append(messageElement);
};