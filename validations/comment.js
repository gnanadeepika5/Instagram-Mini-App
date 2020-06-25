const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateComment(data){
  const errors = {};

  if(isEmpty(data.text)){
    errors.comments = 'text in Comment cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}