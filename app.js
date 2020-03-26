const express = require('express');
const path = require('path');

const users = require('./routes/users');
const cards = require('./routes/cards');
const wrongPage = require('./routes/wrongPage');


const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.use('/cards', cards);
app.use('/users', users);
app.use('*', wrongPage);

app.listen(PORT);
