//user (by whom post created)
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
    }

  }],
  
  date: {
  type: Date,
  default: Date.now //now gives current date and time.
  }

}); 
module.exports = Post = mongoose.model('posts', PostSchema);