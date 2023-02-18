const { sequelize, models } = require('../integration/database');
const { generateHash } = require('../utils/bcrypt');

const User = models.User;

module.exports = {
  createUser: async (user) => {
    return await sequelize.transaction(async (t) => {
      user.password = await generateHash(user.password);
      return await User.create(user);
    });
  },
  getExistingUser: async (username) => {
    return await sequelize.transaction(async (t) => {
      return await User.findOne({ where: { username: username } });
    });
  },
};
