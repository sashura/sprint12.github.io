const express = require('express');
require('dotenv').config();
const helmet = require('helmet');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validator = require('validator');
const { celebrate, Joi, errors } = require('celebrate');


const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;


const app = express();

app.use(helmet());
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2),
    avatar: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }
        return helpers.message('Ссылка неккоректна');
      }),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5),
  }),
}), createUser);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT);
