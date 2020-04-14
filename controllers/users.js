const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(({ message: err.message })));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((data) => {
      if
      (data === null) {
        res.status(404).json({ message: 'Пользователь не найден' });
      }
      res.status(200).send({ data });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).json({ message: 'Используйте валидный id' });
      } else {
        res.status(500).send(({ message: err.message }));
      }
    });
};


const createUser = (req, res) => {
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const updateUserData = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true })
    .then((user) => {
      if
      (user === null) {
        res.status(404).json({ message: 'Пользователь не найден' });
      }
      if (!user._id.equals(req.user._id)) {
        res.status(403).json({ message: 'Нет прав для изменения данных пользователя' });
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true })
    .then((data) => {
      if (data._id !== req.user._id) {
        res.status(403).json({ message: 'Нет прав для изменения данных пользователя' });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports = {
  updateAvatar,
  updateUserData,
  createUser,
  getUserById,
  getUsers,
  login,
};
