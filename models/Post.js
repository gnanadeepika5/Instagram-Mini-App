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
  // user:{
  //   type:Schema.Types.ObjectId,
  //   ref:'users'
  // },
  // name:{
  //   type:string,
  //   required:true
  // },
  // avatar:{
  //   type:string
  // },
  // handle:
  // {
  //   type:string
  // },
  // imageOrVideo:{
  //   type:string,
  //   required:false
  // },
  // text:{
  //   type:string
  // },
  // likes:[{
  //   user:{
  //     type:Schema.Types.ObjectId,
  //     ref:'users'
  //   }

  // }],
  // comments:[{
  //   user:{
  //       type:Schema.Types.ObjectId,
  //       ref:'users'
  //   },
  //   name:{
  //     type:string,
  //   },
  //   avatar:{
  //     type:string
  //   },
  //   text:{
  //     type:string,
  //     required:true
  //   },
  //   date:{
  //     type:Date,
  //     default:Date.now
  //   }
  // }],
  // date:{
  //   type:Date,
  //   default:Date.now
  // }



user:{
  type: Schema.Types.ObjectId,
   ref:'users'
},
// user:{
//   type: String
// },

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
  imageOrVideo:{
      type:String,
      required:false
    },

  date: {
  type: Date,
  default: Date.now //now gives current date and time.
  }

}); 
module.exports = Post = mongoose.model('posts', PostSchema);