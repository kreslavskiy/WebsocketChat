const CHAR_RETURN = 13;
let SENDER_EMAIL;
let RECIEVER_EMAIL;
  
const socket = new WebSocket('ws://127.0.0.1:8080/chat');
const chat = document.getElementById('chat');
const userEmail = document.getElementById('email');
const recieverEmail = document.getElementById('reciever_email');
const msg = document.getElementById('msg');
msg.focus();
  
const showInputMessage = () => {
  if (msg.hidden) {
    msg.hidden = false;
    document.getElementById('msg_input').hidden = false;

    userEmail.hidden = true;
    document.getElementById('email_input').hidden = true;

    recieverEmail.hidden = true;
    document.getElementById('reciever_email_input').hidden = true;
  } 
};

const writeLine = (text) => {
  const line = document.createElement('div');
  line.innerHTML = `<p>${text}</p>`;
  chat.appendChild(line);
};

socket.addEventListener('open', () => {
  writeLine('connected');
});

socket.addEventListener('close', () => {
  writeLine('closed');
});

socket.addEventListener('message', ({ data }) => {
  writeLine(data);
});

userEmail.addEventListener('keydown', (event) => {
  if (event.keyCode === CHAR_RETURN) {
    const sender = userEmail.value;
    const reciever = recieverEmail.value;
    if (sender && reciever) {
      SENDER_EMAIL = sender;
      userEmail.value = '';
      recieverEmail.value = '';
      showInputMessage();
      socket.send(`${SENDER_EMAIL},${RECIEVER_EMAIL}`)
    } else {
      alert('Заполните имейл обоих юзеров')
    }
  }
});

recieverEmail.addEventListener('keydown', (event) => {
  if (event.keyCode === CHAR_RETURN) {
    const sender = userEmail.value;
    const reciever = recieverEmail.value;
    if (sender && reciever) {
      SENDER_EMAIL = sender;
      RECIEVER_EMAIL = reciever;
      userEmail.value = '';
      recieverEmail.value = '';
      socket.send(`${SENDER_EMAIL},${RECIEVER_EMAIL}`)
      showInputMessage();
    } else {
      alert('Заполните имейл обоих юзеров')
    }
  }
});

msg.addEventListener('keydown', (event) => {
  if (event.keyCode === CHAR_RETURN && msg.value) {
    const message = msg.value;
    msg.value = '';
    writeLine(message);
    socket.send(`${message},${SENDER_EMAIL},${RECIEVER_EMAIL}`);
  }
});
