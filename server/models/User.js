var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String },
  likes: { type: Array },
});

UserSchema.pre('save', function (next) {
  var User = this;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(User.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }
      User.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
}
module.exports = mongoose.model('User', UserSchema);
