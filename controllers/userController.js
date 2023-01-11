'use strict';

const getUserByEMail = require('../models/user.js');

const getUserByEMailController = async (email) => {
  const user = await getUserByEMail(email);
  if (!user) console.log('user not found');
  else return user.id;
};

module.exports = getUserByEMailController;