const router = require('express').Router();

const auth = require('../middlewares/auth');


const {
  getUsers,
  getUserById,
  updateUserData,
  updateAvatar,
} = require('../controllers/users');


router.get('/', auth, getUsers);
router.get('/:userId', auth, getUserById);
router.patch('/me', auth, updateUserData);
router.patch('/me/avatar', auth, updateAvatar);


module.exports = router;
