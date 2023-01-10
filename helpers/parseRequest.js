'use strict';

const parseRequest = (stringRequest) => {
  const data = stringRequest.toString().split(',');
  return {
    message: data[0],
    email: data[1] 
  }
};

module.exports = parseRequest;