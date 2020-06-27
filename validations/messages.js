const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateMessage(data){
  const errors = {};

  if(isEmpty(data.msg)){
    errors.messages = 'msg cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}