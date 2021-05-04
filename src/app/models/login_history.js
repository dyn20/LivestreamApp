const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const LoginHistory = new Schema({
  email: {type: String, default: ''},
  createAt: {type: Date, default: Date.now} 
});
module.exports = mongoose.model('LoginHistory', LoginHistory);