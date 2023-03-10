'use strict';

const addMessage = require('../models/messages.js');

const addMessageController = async (content, sender_id, reciever_id, chat_id) => {
  await addMessage({ content, sender_id, reciever_id, chat_id }).then((result) => {
    if (result) return { messages: 'Success', resultCode: 0 };
    return { messages: 'Something went wrong!', resultCode: 1 };
  });
};

module.exports = addMessageController;