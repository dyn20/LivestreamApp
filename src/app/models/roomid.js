const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const roomID = new Schema({
  Admin:{type:String,default:''},
  IDroom: {type: String, default: ''},
  createAt: {type: Date, default: Date.now} 
});
module.exports = mongoose.model('roomID', roomID);