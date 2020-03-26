const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;


router.get('/', (req, res) => {
  const file = path.join(__dirname, '../data/users.json');
  const readFile = fs.createReadStream(file, { encoding: 'utf8' });
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  readFile.pipe(res);
});


router.get('/:id', (req, res) => {
  const users = path.join(__dirname, '../data/users.json');
  fsPromises.readFile(users, { encoding: 'utf8' })
    .then((data) => {
      /*eslint-disable */

      const userFind = JSON.parse(data).find((item) => item._id === req.params.id);
      /* eslint-enable */
      if (!userFind) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(userFind);
    });
});

module.exports = router;
