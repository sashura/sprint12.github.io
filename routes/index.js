const router = require('express').Router();

const users = require('./users');
const cards = require('./cards');
const wrongPage = require('./wrongPage');

router.use('/cards', cards);
router.use('/users', users);
router.use('*', wrongPage);

module.exports = router;
