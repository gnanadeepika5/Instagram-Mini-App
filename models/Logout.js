const mongoose = require('mongoose');
const Schema= mongoose.Schema;

//create Logout Schema
const LogoutSchema = new Schema({
  user:{
    type: Schema.Types.ObjectId,
     ref:'users'
  },
  email: {
    type : String,
  },


  LogoutTokenList:[{

  token:{
    type: String
  },
  TokenExpirationTime:{
type:String
  },
  ActualTime: {
    type: Date,
    default: new Date().getTime()/1000
  }
  }],



  date: {
      type: Date,
      default: Date.now()   //now gives current date and time.
    }

})
module.exports = Logout = mongoose.model('logouts', LogoutSchema);