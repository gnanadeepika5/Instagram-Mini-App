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
  }
,
  ExpirationTime:{
    type: Date,
    default: new Date().getTime()
    //default: (new Date().getTime() + 1 * 60 * 1000)/1000  //adding 1* 60 * 1000 gives 1 minutes in milli seconds. 
    //divideing by 1000 gives seconds
    //so current time + milli seconds of 60 minutes and divinding by 100 to get in seconds format
  }

})
module.exports = Story = mongoose.model('stories', StorySchema);