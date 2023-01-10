const { getChat, createChat } = require('../models/chats.js');

const getChatController = async (sender, reciever) => {
  const rows = await getChat({ sender, reciever }).catch(err => {
    console.log(err);
  });
  return rows;
};

const createChatController = async (sender, reciever) => {
  return await createChat({ sender, reciever });
};

module.exports = { getChatController, createChatController };
