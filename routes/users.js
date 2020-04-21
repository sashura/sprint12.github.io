const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');


const {
  getUsers,
  getUserById,
  updateUserData,
  updateAvatar,
} = require('../controllers/users');


router.get('/', auth, getUsers);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().required(),
  }),
}), auth, getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), auth, updateUserData);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), auth, updateAvatar);


module.exports = router;
