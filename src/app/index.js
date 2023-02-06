const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://127.0.0.1:5173',
  credentials: true,
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  return res.send('helloo');
});

app.use('/auth', require('./routes/authRoute'));
app.use('/applications', require('./routes/applicationRoute'));

module.exports = app;
