const router = require('express').Router();

router.all('/', (req, res) => {
  res.status(404).send(JSON.stringify({ message: 'Запрашиваемый ресурс не найден' }));
});

module.exports = router;
