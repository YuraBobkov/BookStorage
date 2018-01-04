var jwt = require('jwt-simple');
var User = require('../models/User');
var config = require('../config');

function tokenForUser(user) {
  var timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
exports.login = function (req, res) {
  res.send({
    token: tokenForUser(req.user),
    user: {
      name: req.user.name,
      email: req.body.email,
      admin: (req.user.name === 'admin' && req.body.email === 'admin@gmail.com'),
    },
    likes: req.user.likes,
  });
};
exports.register = function (req, res, next) {
  var  email = req.body.email;
  var  password = req.body.password;
  var  name = req.body.name;
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password' });
  }
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }
    var user = new User({
      email: email,
      password: password,
      name: name,
    });
    user.save(function (err) {
      if (err) {
        return next(err);
      }
      res.json({ token: tokenForUser(user),
        user: {
          name: name,
          email: email,
          admin: (name === 'admin' && email === 'admin@gmail.ru'),
        },
        likes: [],
      });
    });
  });
};
