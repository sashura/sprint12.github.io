const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Длина имени пользователя от 2 до 30 символов'],
    maxlength: [30, 'Длина имени пользователя от 2 до 30 символов'],
    required: [true, 'Поле обязательно для заполнения'],
  },
  about: {
    type: String,
    minlength: [2, 'Длина имени пользователя от 2 до 30 символов'],
    maxlength: [30, 'Длина имени пользователя от 2 до 30 символов'],
    required: [true, 'Поле обязательно для заполнения'],
  },
  email: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    unique: true,
    validate: function typeValidate(email) {
      return validator.isEmail(email);
    },
  },
  password: {
    type: String,
    minlength: [5, 'Длина пароля не менее 5 символов'],
    required: [true, 'Поле обязательно для заполнения'],
    select: false,
  },
  avatar: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    validate: function typeValidate(url) {
      return validator.isURL(url);
    },
  },
});


userSchema.statics.findUserByCredentials = function findByAuthParamets(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Ошибка авторизации'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Ошибка авторизации'));
          }
          return user;
        });
    });
};

userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

module.exports = mongoose.model('user', userSchema);
