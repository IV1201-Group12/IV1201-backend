const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  return res.send('helloo');
});

app.use('/things', require('./routes/thingRoute'));
app.use('/login', require('./routes/loginRoute'));
app.use('/applications', require('./routes/applicationRoute'));
app.use('/createAccount', require('./routes/createAccountRoute'));

module.exports = app;
