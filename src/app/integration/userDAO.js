//temp
const { generateHashSync } = require('../utils/bcrypt');

const users = [
  { username: 'edvin', password: generateHashSync('pass') },
  { username: 'edvin2', password: generateHashSync('pass2') },
];

module.exports = {
  getExistingUser: (username) => {
    return users.find((user) => user.username === username);
  },
};