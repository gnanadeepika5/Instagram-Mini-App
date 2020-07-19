
const mongoose = require('mongoose');
const Schema= mongoose.Schema;
//create Post Schema
const PostSchema = new Schema({
  



user:{
  type: Schema.Types.ObjectId,
   ref:'users'
},
  name : {
    type: String,
  required: true
  },
  avatar:
  {
    type: String,
    required: true
  },
  handle:{
    type:String,
    required:true
  },
  imageOrVideoLink: {
    type: String,
    required: true
  },
  isImageOrVideo: {
    type: String,
    required: true
  },
    text:{
      type:String,
      required:true
    },
    comments:[{
    user:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    name:{
      type:String,
    },
    handle:{
      type:String
    },
    avatar:{
      type:String
    },
    text:{
      type:String,
      required:true
    },
    date:{
      type:Date,
      default:Date.now
    }
  }],
  likes:[{
    user:{
      type:Schema.Types.ObjectId,
      ref:'users'
    },
    name: {
      type: String
    },
    handle: {
      type: String
    },
    avatar: {
      type: String
    }

  }],
  
  date: {
  type: Date,
  default: Date.now //now gives current date and time.
  }

}); 
module.exports = Post = mongoose.model('posts', PostSchema);