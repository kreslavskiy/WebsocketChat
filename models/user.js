'use strict';

const pool = require('../db/pool.js');

const getUserByEMail = async (email) => {
  try {
    const user = await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
    return user.rows[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = getUserByEMail;