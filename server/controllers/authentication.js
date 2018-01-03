const jwt = require('jwt-simple');
const User = require('../models/User');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
exports.login = function (req, res) {
  const email = req.body.email;
  res.send({
    token: tokenForUser(req.user),
    user: {
      name: req.user.name,
      email: email,
      admin: (req.user.name === 'admin' && email === 'admin@gmail.com'),
    },
    likes: req.user.likes,
  });
};
exports.register = function (req, res, next) {
  const { email, password, name } = req.body;
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
    const user = new User({
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
