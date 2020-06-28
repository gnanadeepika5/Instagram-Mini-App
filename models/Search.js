const mongoose = require('mongoose');
const Schema= mongoose.Schema;

//create Post Schema
const SearchSchema = new Schema({
  // user:{
  //   type: Schema.Types.ObjectId,
  //    ref:'users'
  // },
  // name : {
  //   type: String
  // },
  // handle:{
  //   type:String
  // },
  searchText:{
    type:String,
    required:true
  },

});
module.exports = Search = mongoose.model('search', SearchSchema);