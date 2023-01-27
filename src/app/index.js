const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  return res.send('hello1');
});

app.use('/things', require('./routes/thingRoute'));
app.use('/login', require('./routes/loginRoute'));

module.exports = app;
