const User = require('../models/user');


const getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(err.message));
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
    .catch((err) => res.status(500).send(err.message));
};


const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(500).send(err.message));
};

const updateUserData = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send(err.message));
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send(err.message));
};

module.exports = {
  updateAvatar,
  updateUserData,
  createUser,
  getUserById,
  getUsers,
};
