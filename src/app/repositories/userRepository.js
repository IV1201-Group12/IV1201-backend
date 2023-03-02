/**
 * This module exports an object that functions as an interface to the database
 * for authentication related queries.
 */

const { sequelize, models } = require('../integration/database');
const { generateHash } = require('../utils/bcrypt');

const User = models.User;

module.exports = {
  /**
   * This function creates a new user and stores it in the database.
   * It will store a hashed value of the provided password.
   * @param {*} user An object containing the attributes to give the new user.
   * @returns An object of the newly created user.
   */
  createUser: async (user) => {
    return await sequelize.transaction(async () => {
      user.password = await generateHash(user.password);
      return await User.create(user);
    });
  },
  /**
   * Tries to find a user with a given username in the database and if found
   * returns it to the caller.
   * @param {*} username The user to find.
   * @returns Found user, if any.
   */
  getExistingUser: async (username) => {
    return await sequelize.transaction(async () => {
      return await User.findOne({ where: { username: username } });
    });
  },
};
