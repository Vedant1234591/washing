const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const laundarySchema = new Schema({
  title: String,
  description: String,
  image: String,
  category: String, 
  longitude: String,
  latitude: String,
  phone: Number,

});

const Laundary = mongoose.model("Laundary", laundarySchema);
module.exports = Laundary;