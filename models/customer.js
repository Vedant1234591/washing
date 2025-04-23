const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: String,
  address: String,
  phone: String,
  products: String,
  totalcloth: String,
  totalweight: String,
  nameofcloth: String,
  totalamount: Number,

});

const Customer = mongoose.model("Customer", customerSchema);
module.exports = Customer;