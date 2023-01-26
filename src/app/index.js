const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.send('hello1');
});

app.use('/things', require('./routes/thingRoute'));

module.exports = app;
