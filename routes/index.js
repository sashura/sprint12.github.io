const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const users = require('./users');
const cards = require('./cards');
const wrongPage = require('./wrongPage');

router.use('/cards', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().required(),
  }),
}), cards);

router.use('/users', celebrate({
  cookies: Joi.object().keys({
    jwt: Joi.string().required(),
  }),
}), users);

router.use('*', wrongPage);

module.exports = router;
