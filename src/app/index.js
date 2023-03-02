/**
 * This module imports the express library and does all initial
 * configuration to it. It configures top level middleware and routes
 * to use.
 */

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { authorizeRequest } = require('./middleware/authorization');
const { corsOptions } = require('./config/cors-config');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions()));

app.get('/', (req, res) => {
  return res.send('Hello');
});

/**
 * This piece of code sets up the routes of the application.
 * Route-specific middleware can be attached here.
 */
app.use('/auth', require('./routes/authRoute'));
app.use(
  '/applications',
  authorizeRequest(['recruiter']),
  require('./routes/applicationRoute'),
);

module.exports = app;
