const app = require('./app');

const PORT = process.env.PORT || 5001;

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error: ' + err);
  } else {
    console.log('Server is running on ' + PORT);
  }
});
