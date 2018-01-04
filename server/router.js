'use strict';

var Authentication = require('./controllers/authentication');
var passportService = require('./services/passport');

var passport = require('passport');

var requireAuth = passport.authenticate('jwt', { session: false });
var requireSignIn = passport.authenticate('local', { session: false });

module.exports = function (app) {
  app.get('/', requireAuth, function (req, res) {
    res.send({ message: 'S3CR3T M3SS4G3' });
  });
  app.post('/register', Authentication.register);
  app.post('/login', requireSignIn, Authentication.login);
};
