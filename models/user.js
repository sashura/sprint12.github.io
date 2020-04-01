const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Длина имени пользователя от 2 до 30 символов'],
    maxlength: [30, 'Длина имени пользователя от 2 до 30 символов'],
    required: [true, 'Поле обязательно для заполнения'],
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'Поле обязательно для заполнения'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    validate: async function typeValidate(url) {
      return validator.isURL(url);
    },
  },
});

module.exports = mongoose.model('user', userSchema);
