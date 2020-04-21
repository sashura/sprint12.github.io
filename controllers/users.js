const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const NotFoundError = require('../errors/not-found-error');
const Forbidden = require('../errors/forbidden');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');

const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        samSite: 'lax',
      });
    })
    .then(() => res.status(200).send({ message: 'Авторизация прошла успешно ' }))
    .catch(() => {
      res
        .status(401)
        .send({ message: 'Неверный логин или пароль' });
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((data) => {
      if
      (data === null) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.status(200).send({ data });
    })
    .catch(next);
};


const createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  if (req.body.password === undefined) {
    res.status(400).send({ message: 'Пароль для регистрации не введен' });
  }
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name,
      about: user.about,
      email: user.email,
      avatar: user.avatar,
    }))
    .catch(next);
};

const updateUserData = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true })
    .then((user) => {
      if
      (user === null) {
        throw new NotFoundError('Пользователь не найден');
      }
      if (!user._id.equals(req.user._id)) {
        throw new Forbidden('Нет прав для изменения данных пользователя');
      }
      res.status(200).send({ user });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true })
    .then((data) => {
      if (data._id !== req.user._id) {
        throw new Forbidden('Нет прав для изменения данных пользователя');
      }
      res.send(data);
    })
    .catch(next);
};

module.exports = {
  updateAvatar,
  updateUserData,
  createUser,
  getUserById,
  getUsers,
  login,
};
