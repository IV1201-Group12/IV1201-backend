const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// const corsOptions = {
//   origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
//   credentials: true,
// };

// app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, X-PINGOTHER, ACCESSTOKEN, Access-Control-Allow-Origin',
  );
  next();
});
app.get('/', (req, res) => {
  return res.send('helloo');
});

app.use('/auth', require('./routes/authRoute'));
app.use('/applications', require('./routes/applicationRoute'));

module.exports = app;
