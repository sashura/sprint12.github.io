const router = require('express').Router();
const path = require('path');
const fs = require('fs');


router.get('/', (req, res) => {
  const readFile = fs.createReadStream(path.join(__dirname, '../data/cards.json'), { encoding: 'utf8' });
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  readFile.pipe(res);
});

module.exports = router;
