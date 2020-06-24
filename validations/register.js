const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data){
  let errors = {};

  if (!validator.isLength(data.name, {min: 2, max: 30} )){
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (!validator.isEmail(data.email)){
    errors.email = 'Email is invalid';
  }

  if (isEmpty(data.email)){
    errors.email = 'Email is required';
  }

  if (!validator.isLength(data.password, {min: 5, max: 30} )){
    errors.password = 'Password must be between 5 and 30 characters';
  }

  if (isEmpty(data.password)){
    errors.password = 'Password field is required';
  }

  if (isEmpty(data.password2)){
    errors.password2 = 'Confirm Password field is required';
  }

  if (!validator.equals(data.password, data.password2)){
    errors.password2 = 'Password must match';
  }

return {
  errors,
  isValid: isEmpty(errors)
};

};