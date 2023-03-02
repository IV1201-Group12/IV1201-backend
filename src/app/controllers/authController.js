/**
 * This module exports an object containing all the controller functions that handle
 * endpoints related to authentication.
 */

const userRepository = require('../repositories/userRepository');
const {
  cookieConfigLogin,
  cookieConfigLogout,
} = require('../config/cookie-config');
const { comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');
const { ValidationError } = require('sequelize');

module.exports = {
  /**
   * An asynchronous function that registers a new user.
   * Sets the role of the new user to 'applicant'.
   * @param {*} req The HTTP request object.
   * @param {*} res The HTTP response object.
   */
  register: async (req, res) => {
    req.body.role = 'applicant';
    try {
      await userRepository.createUser(req.body);
    } catch (err) {
      if (err instanceof ValidationError) {
        res.status(400).send(err.errors[0].message);
      } else {
        res.status(500).send('Error');
      }
    }
    res.status(201).send();
  },
  /**
   * An asynchronous function that logs a user in.
   * If the user does not exist, returns a 401 Unauthorized response.
   * Generates a token for the user using the generateToken function.
   * @param {*} req The HTTP request object.
   * @param {*} res The HTTP response object.
   * @returns 200 OK response with the user's username and role in JSON format.
   */
  login: async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await userRepository.getExistingUser(username);
    if (!existingUser) {
      return res.status(401).send('No user with those credentials');
    }
    const validPass = await comparePassword(password, existingUser.password);
    if (!validPass) {
      return res.status(401).send('No user with those credentials');
    }
    const token = generateToken(existingUser);
    return res
      .cookie('ACCESSTOKEN', token, cookieConfigLogin())
      .status(200)
      .json({ username: existingUser.username, role: existingUser.role });
  },
  /**
   * Logs the user out by setting the access token cookie to 'none'.
   * @param {*} req The HTTP request object.
   * @param {*} res The HTTP response object.
   */
  logout: async (req, res) => {
    res.cookie('ACCESSTOKEN', 'none', cookieConfigLogout());
    res.status(200).json({ message: 'Logged out' });
  },
};
