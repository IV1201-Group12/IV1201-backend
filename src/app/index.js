const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  return res.send('helloo');
});

app.use('/things', require('./routes/thingRoute'));
app.use('/applications', require('./routes/applicationRoute'));

module.exports = app;
