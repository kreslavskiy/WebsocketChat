'use strict';

const fs = require('node:fs');
const http = require('node:http');
const WebSocket = require('ws');
const addMessageController = require('./controllers/messageController.js');
const { getChatController, createChatController } = require('./controllers/chatController.js');
const parseRequest = require('./helpers/parseRequest.js');

const index = fs.readFileSync('./app/index.html', 'utf8');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(index);
});

server.listen(8080, () => {
  console.log('Listen port 8080');
});

const SENDER_ID = '781baed3-00e7-442f-a528-f69f6dbf6db5';
const RECIEVER_ID = 'b7703a63-9b8d-45aa-b027-8a9de5c19619';//'a31a2b69-e3e8-402a-9c4b-faeaf73d8596';

const ws = new WebSocket.Server({ server });

ws.on('connection', async (connection, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`Connected ${ip}`);
  connection.on('message', async (data) => {
    const parsedData = parseRequest(data);
    console.log('Received: ' + parsedData.message);
    for (const client of ws.clients) {
      if (client.readyState !== WebSocket.OPEN) continue;
      if (client === connection) continue;
      const mail = client.emit('getEmail');
      //console.log(mail);

      let chat = await getChatController(SENDER_ID, RECIEVER_ID);
      console.log(chat);
      if (!chat) {
        chat = await createChatController(SENDER_ID, RECIEVER_ID);
      }
      await addMessageController(parsedData.message, SENDER_ID, RECIEVER_ID, chat.id);
      
      client.send(parsedData.message, { binary: false });
    }
  });

  connection.on('close', () => {
    console.log(`Disconnected ${ip}`);
  });
});
