const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateUploadPostInput = data => {
  const errors = {};

  if(isEmpty(data.imageOrVideo)){
    errors.imageOrVideo = 'Cannot post without image or video';
  }

  if(isEmpty(data.comments.text)){
    errors.comments = 'Comment cannot be empty';
  }

  return{
    errors,
    isValid: isEmpty(errors)
  }
}
