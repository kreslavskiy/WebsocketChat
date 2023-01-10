'use strict';

const pool = require('../db/pool.js');
const { v4: uuidv4 } = require('uuid');

const getChat = async (users) => {
  const { sender, reciever } = users;
  const sql = `SELECT * FROM chats 
    WHERE user_1 in ('${sender}', '${reciever}') 
    AND user_2 in ('${sender}', '${reciever}')`;
  const result = await pool.query(sql);
  return result.rows[0];
};

const createChat = async (users) => {
  const id = uuidv4();
  const { sender, reciever } = users;
  const date = Date.now();
  const sql = `INSERT INTO chats (id, user_1, user_2, chat_date) VALUES ('${id}', '${sender}', '${reciever}', '${date}')`;
  await pool.query(sql);
  return { id, sender, reciever, date };
};

createChat({ sender: '781baed3-00e7-442f-a528-f69f6dbf6db5', reciever: 'b7703a63-9b8d-45aa-b027-8a9de5c19619' })

module.exports = { getChat, createChat };

//createChat({sender: '781baed3-00e7-442f-a528-f69f6dbf6db5', reciever: 'a31a2b69-e3e8-402a-9c4b-faeaf73d8596'});
