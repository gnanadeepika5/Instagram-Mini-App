const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validatePostInput = data => {
  const errors = {};

  if(isEmpty(data.imageOrVideoLink)){
    errors.imageOrVideoLink = 'Cannot post without image or video';
  }

  if(isEmpty(data.text)){
    errors.text = 'text (Caption/Description of post) cannot be empty';
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}
