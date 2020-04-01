const router = require('express').Router();
// const path = require('path');
// const fs = require('fs');
// const fsPromises = require('fs').promises;
const {
  getUsers,
  getUserById,
  createUser,
  newUserData,
  updateAvatar,
} = require('../controllers/users');


router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', newUserData);
router.patch('/me/avatar', updateAvatar);


module.exports = router;
