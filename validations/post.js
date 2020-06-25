const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validatePostInput = data => {
  const errors = {};

  if(isEmpty(data.imageOrVideo)){
    errors.imageOrVideo = 'Cannot post without image or video';
  }

  if(isEmpty(data.text)){
    errors.text = 'text (Caption/Descrription of post) cannot be empty';
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}
