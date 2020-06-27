const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create User schema
const UserSchema = new Schema({
  name : {
    type: String,
  required:true
  },
  email: {
    type : String,
    required : true
  },
  password: {
  type: String,
  required : true
  },
  handle: {
    type: String,
    required: true
  },
  //talking to external api gravatar to get a picture of a user
  avatar: {
  type: String,
  required: false
  },
  messages:[{
    fromUserId:{
      type:Schema.Types.ObjectId,
      ref:'users'
  },
  fromUserName:{
    type:String,
  },
  toUser:{
    type:String
  },
  msg:{
    type:String,
    required:true
  }
  }],
  date: {
  type: Date,
  default: Date.now //now gives current date and time.
  }
});

module.exports = User = mongoose.model('users', UserSchema);
