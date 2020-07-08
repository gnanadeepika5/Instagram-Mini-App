const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateStoryInput = data => {
  const errors = {};

  if(isEmpty(data.imageOrVideoOrtext)){
    errors.imageOrVideoOrtext = 'Cannot post a story without image or video or text';
  }
  return{
    errors,
    isValid: isEmpty(errors)
  }
}
