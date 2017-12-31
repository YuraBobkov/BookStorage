const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const router = require('./router');
const { serverPort } = require('./config.json');

import * as db from './utils/DataBaseUtils';

const app = express();

db.setUpConnection();

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors({ origin: '*' }));

router(app);

app.get('/books', (req, res) => {
  db.getAllBooks().then(data => res.send(data));
});

app.post('/books', (req, res) => {
  db.updateBook(req.body).then(e=> res.send(e));
});

app.post('/likedbooks', (req, res) => {
  db.setGoodBook(req.body).then(data => res.send([...data, req.body.number]));
});

app.post('/mybooks', (req, res) => {
  db.bestBooksList(req.body).then(books => res.send(books));
});

const server = app.listen(serverPort, function() {
  console.log(`Server is up and running on port ${serverPort}`);
});
