const mongoose = require('mongoose');
const Schema= mongoose.Schema;

//create communication Schema
const CommunicationSchema = new Schema({
  fromUserId:{
    type: Schema.Types.ObjectId,
     ref:'users'
  }, 
  toUserId:{
    type: Schema.Types.ObjectId,
     ref:'users'
  },
  conversationId:{
    type:String,
    required:true
  },
  messages:[{
    fromUserId:{
      type:Schema.Types.ObjectId,
      ref:'users'
  },
  // fromUserName:{
  //   type:String,
  // },
  toUserId:{
    type:Schema.Types.ObjectId,
      ref:'users'
  },
  msg:{
    type:String,
    required:true
  },
  flagRead:{
    type:Boolean
  },
  date: {
    type: Date,
    default: Date.now //now gives current date and time.
    }

  }],
  date: {
    type: Date,
    default: Date.now //now gives current date and time.
    }
});
module.exports = Communication = mongoose.model('Communications', CommunicationSchema);