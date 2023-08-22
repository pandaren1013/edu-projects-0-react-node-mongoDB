const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
// const User = mongoose.model(
//   "User",
//   new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    location:String,
    website:String,
    company:String,
    phone:String,
    birthday:{type:String},
    avatar:String ,

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      // default: Date.now,
      type: Date,
      // default: Date.now,
    },
    
  });


  module.exports = mongoose.model('User', UserSchema);
