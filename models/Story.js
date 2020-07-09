const mongoose = require('mongoose');
const Schema= mongoose.Schema;

//create Post Schema
const StorySchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
     ref:'users'
  },
  name : 
  {
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
  imageOrVideoOrtext:{
      type:String,
      required:true
  },
  text:{
    type:String
  },
  expire_at: {
    type: Date, 
    default: Date.now, 
    expires: 300//5 minutes 24 hours is 86400
    } 

})
module.exports = Story = mongoose.model('stories', StorySchema);