const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateSearch = data => {
  const errors = {};
  
  if(isEmpty(data.searchText)){
    errors.searchText = 'Search text cannot be empty';
  }
  

  return{
    errors,
    isValid: isEmpty(errors)
  }
}