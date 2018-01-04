var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var router = require('./router');
var serverPort = require('./config.json').serverPort;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
var _utilsDataBaseUtils = require('./utils/DataBaseUtils');

var db = _interopRequireWildcard(_utilsDataBaseUtils);

var app = express();

db.setUpConnection();

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors({ origin: '*' }));

router(app);

app.get('/books', function (req, res) {
  db.getAllBooks().then(data => res.send(data));
});

app.post('/books', function (req, res) {
  db.updateBook(req.body).then(e=> res.send(e));
});

app.post('/get-user', function (req, res) {
  db.encode(req.body).then(user => {
    res.send({
      user: {
        email: user.email,
        name: user.name,
        admin: user.email === 'admin@gmail.com',
      },
      likes: user.likes,
    });
  });
});

app.post('/set-good-book', function (req, res) {
  db.setGoodBook(req.body).then(data => res.send([].concat(data, req.body.number)));
});

app.post('/del-good-book', function (req, res) {
  db.delGoodBook(req.body).then(data => res.send(data));
});

app.post('/mybooks', function (req, res) {
  db.bestBooksList(req.body).then(books => res.send(books));
});

var server = app.listen(serverPort, function () {
  console.log(`Server is up and running on port ${serverPort}`);
});
