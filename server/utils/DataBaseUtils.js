var mongoose = require('mongoose');
var jwt = require('jwt-simple');

var config = require('../config.json');

require('../models/User');

require('../models/Books');

var User = mongoose.model('User');
var Books = mongoose.model('Books');

exports.encode = encode;
exports.setUpConnection = setUpConnection;
exports.getAllBooks = getAllBooks;
exports.setGoodBook = setGoodBook;
exports.delGoodBook = delGoodBook;
exports.bestBooksList = bestBooksList;
exports.updateBook = updateBook;


function decode (token) {
  return jwt.decode(token, config.secret);
}

function encode(req) {
  var user = decode(req.token);
  return User.findOne({ _id: user.sub });
}
function setUpConnection() {
  mongoose.connect('mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name);
}

function getAllBooks() {
  return Books.find();
}

function setGoodBook(data) {
  return User.findOneAndUpdate({ email: data.user }, { $addToSet: { 'likes': data.number } }).then(function (user) {
    return user.likes;
  });
}

function delGoodBook(data) {
  return User.findOneAndUpdate({ email: data.user }, { $pull: { 'likes': data.number } }).then(function (user) {
    var i = user.likes.indexOf(data.number);
    i !== -1 ? user.likes.splice(i, 1) : null;
    return user.likes;
  });
}

function bestBooksList(body) {
  return User.findOne({ email: body.email }).then(function (user) {
    return Books.find({ _id: { $in: user.likes } });
  });
}

function updateBook(data) {
  return Books.findOneAndUpdate({ name: data.activeBook }, { $set: data.values });
}

