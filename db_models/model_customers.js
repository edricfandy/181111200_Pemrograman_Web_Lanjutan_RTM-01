const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var customerSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone_num: {
    type: String,
    required: true
  }
}, { timestamps: true });

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;