'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true },
  fullname: {type: String, required: true },
  age: Number,
  phone: Number,
  homeTown: String,
  updated: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', UserSchema);