const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  cart:[{
    type:mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'Listing'
  }],
  orders:[{
    type:mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'Customer'
  }]   
  
});

userSchema.plugin(passportLocalMongoose);
const User =  mongoose.model("User", userSchema);  
module.exports = User