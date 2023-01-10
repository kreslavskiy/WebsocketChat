'use strict';

const parseRequest = (stringRequest) => {
  const data = stringRequest.toString().split(',');
  return {
    message: data[0],
    sender: data[1],
    reciever: data[2] 
  }
};

module.exports = parseRequest;