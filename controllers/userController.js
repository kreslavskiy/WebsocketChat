'use strict';

const getUserByEMail = require('../models/user.js');

const getUserByEMailController = async (email) => {
  const user = await getUserByEMail(email);
  return user.id;
};

module.exports = getUserByEMailController;