const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data){
  let errors = {};

  if (!validator.isLength(data.name, {min: 2, max: 30} )){
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (!validator.isEmail(data.email)){
    errors.email = 'Email field is invalid';
  }

  if (isEmpty(data.email)){
    errors.email = 'Email field is required';
  }

return {
  errors,
  isValid: isEmpty(errors)
}

}