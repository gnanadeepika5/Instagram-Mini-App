const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLoginInput(data){
  let errors = {};
  console.log(data);
  
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
  
return {
  errors,
  isValid: isEmpty(errors)
};

};