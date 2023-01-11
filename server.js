'use strict';

const fs = require('node:fs');
const http = require('node:http');
const WebSocket = require('ws');
const addMessageController = require('./controllers/messageController.js');
const { getChatController, createChatController } = require('./controllers/chatController.js');
const getUserByEMailController = require('./controllers/userController.js');
const { parseRequest, findReciever, deleteConnection } = require('./helpers/utils.js');

const index = fs.readFileSync('./app/index.html', 'utf8');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(index);
});

server.listen(8080, () => {
  console.log('Listen port 8080');
});

const ws = new WebSocket.Server({ server });

const clients = [];

ws.on('connection', async (connection, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`Connected ${ip}`);

  connection.on('message', async (data) => {
    const parsedData = parseRequest(data);
    console.log('Received: ' + JSON.stringify(parsedData));

    if (!parsedData.message) clients.push({ ...parsedData, connection });
    else {
      const reciever = findReciever(clients, parsedData.reciever, parsedData.sender);
      const sender = findReciever(clients, parsedData.sender, parsedData.reciever);
      const recieverID = await getUserByEMailController(sender.reciever);
      const senderID = await getUserByEMailController(sender.sender);

      let chat = await getChatController(senderID, recieverID);
      if (!chat) {
        chat = await createChatController(senderID, recieverID);
      }

      if (recieverID) await addMessageController(parsedData.message, senderID, recieverID, chat.id);
      if (reciever) reciever.connection.send(`${sender.sender}: ${parsedData.message}`, { binary: false }); 
    }
  });

  connection.on('close', () => {
    deleteConnection(clients, connection);
    console.log(`Disconnected ${ip}`);
  });
});
