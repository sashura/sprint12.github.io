const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  req.user = {
    _id: '5e82f452f6a5d4b2fe2b1c5a',
  };

  next();
});

app.use('/', router);

app.listen(PORT);
