const mongoose = require('mongoose');

import config from '../config.json';

import '../models/User';
import '../models/Books';

const User = mongoose.model('User');
const Books = mongoose.model('Books');

export function setUpConnection() {
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function getAllBooks() {
  return Books.find();
}

export function setGoodBook(data) {
  return User.findOneAndUpdate({ email: data.user }, { $addToSet: { 'likes': data.number } })
    .then(user => user.likes);
}

export function bestBooksList(body) {
  return Books.find({ _id: { $in: body } });
}

export function updateBook(data) {
  console.log(data)
  return Books.findOneAndUpdate({ name: data.activeBook }, { $set: data.values });
}

