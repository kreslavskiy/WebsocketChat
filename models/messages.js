'use strict';

const pool = require('../db/pool.js');
const { v4: uuidv4 } = require('uuid');

const addMessage = async (data) => {
  try {
    const id = uuidv4();
    const message_date = Date.now();
    const { sender_id, reciever_id, chat_id, content } = data;
    const sql = `INSERT INTO messages (id, sender_id, receiver_id, chat_id, content, message_date) 
      VALUES ('${id}', '${sender_id}', '${reciever_id}', '${chat_id}', '${content}',  '${message_date}');`;
    return await pool.query(sql);
  } catch (error) {
    console.log(error);
  }
};

module.exports = addMessage;

//'366846ba-391d-4e3a-bba6-37a00eb13687'
//'80426217-11ba-41ea-9a51-6ff208163e2d'
