//message (Which get used for message)
//message as post name
//fromUser to message
//toUser user (by whom post created)
//name as post name
//handle to point to post
//avatar as thumbnail of post
//post image or video
//post text as description of post
//likes
//comments
//share
//save
const mongoose = require('mongoose');
const Schema= mongoose.Schema;

//create Post Schema
const MessageSchema = new Schema({

fromUser:{
  type: Schema.Types.ObjectId,
   ref:'users'
},
toUser:{
  type: Schema.Types.ObjectId,
   ref:'users'
},
msg:
{
  type: String,
  required: true
}, 
  msgDate: {
  type: Date,
  default: Date.now //now gives current date and time.
  }
}); 
module.exports = Messages = mongoose.model('messages', MessagesSchema);
