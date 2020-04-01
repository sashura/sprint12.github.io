const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    minlength: [2, 'От 2 до 30 символов'],
    maxlength: [30, 'От 2 до 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    validate: async function typeValidate(url) {
      return validator.isURL(url);
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
