'use strict';

const fs = require('node:fs');
const http = require('node:http');
const WebSocket = require('ws');
const addMessageController = require('./controllers/messageController.js');
const { getChatController, createChatController } = require('./controllers/chatController.js');
const { parseRequest, findReciever } = require('./helpers/utils.js');

const index = fs.readFileSync('./app/index.html', 'utf8');

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(index);
});

server.listen(8080, () => {
  console.log('Listen port 8080');
});

const ws = new WebSocket.Server({ server });

const SENDER_ID = '781baed3-00e7-442f-a528-f69f6dbf6db5';
const RECIEVER_ID = 'b7703a63-9b8d-45aa-b027-8a9de5c19619';//'a31a2b69-e3e8-402a-9c4b-faeaf73d8596';
const clients = [];


ws.on('connection', async (connection, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`Connected ${ip}`);

  connection.on('message', async (data) => {
    const parsedData = parseRequest(data);
    console.log('Received: ' + JSON.stringify(parsedData));

    if (!parsedData.message) clients.push({ ...parsedData, connection });

    const reciever = findReciever(clients, parsedData.reciever, parsedData.sender);
    if (reciever) {
      
      reciever.send(parsedData.message, { binary: false });
    }

      // for (const client of ws.clients) {
      //   if (client.readyState !== WebSocket.OPEN) continue;
      //   if (client === connection) continue;
  
      //   let chat = await getChatController(SENDER_ID, RECIEVER_ID);
      //   if (!chat) {
      //     chat = await createChatController(SENDER_ID, RECIEVER_ID);
      //   }
      //   await addMessageController(parsedData.message, SENDER_ID, RECIEVER_ID, chat.id);
        
      //   client.send(parsedData.message, { binary: false });
      // }


  });

  connection.on('close', () => {
    console.log(`Disconnected ${ip}`);
    console.log(ws.clients);
  });
});
