const mongoose = require('mongoose');
const jwt = require('jwt-simple');

import config from '../config.json';

import '../models/User';
import '../models/Books';

const User = mongoose.model('User');
const Books = mongoose.model('Books');

function decode (token) {
  return jwt.decode(token, config.secret);
}

export function encode(req) {
  var user = decode(req.token);
  return User.findOne({ _id: user.sub });
}
export function setUpConnection() {
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function getAllBooks() {
  return Books.find();
}

export function setGoodBook(data) {
  return User.findOneAndUpdate({ email: data.user }, { $addToSet: { 'likes': data.number } })
    .then(user =>
      user.likes);
}

export function delGoodBook(data) {
  return User.findOneAndUpdate({ email: data.user }, { $pull: { 'likes': data.number } })
    .then(user =>{
      var i = user.likes.indexOf(data.number);
      (i !== -1) ? user.likes.splice(i, 1) : null;
      return user.likes
    });
}

export function bestBooksList(body) {
  return User.findOne({ email: body.email }).then(user => Books.find({ _id: { $in: user.likes } }));
}

export function updateBook(data) {
  return Books.findOneAndUpdate({ name: data.activeBook }, { $set: data.values });
}

