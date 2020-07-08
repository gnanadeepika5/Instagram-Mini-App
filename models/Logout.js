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
  }
  }],
  date: {
      type: Date,
      default: Date.now()   //now gives current date and time.
    }

})
module.exports = Logout = mongoose.model('logouts', LogoutSchema);