const db = require('../integration/database');
const { generateHash } = require('../utils/bcrypt');

const User = db.models.User;

module.exports = {
  createUser: async (user) => {
    user.password = await generateHash(user.password);
    await User.create(user);
  },
  getExistingUser: async (username) => {
    return await User.findOne({ where: { username: username } });
  },
};
