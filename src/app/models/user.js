const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  username: {type: String, default: ''},
  email: {type: String, default:''},
  password: {type: String},
  createAt: {type: Date, default: Date.now} 
});
module.exports = mongoose.model('User', User);