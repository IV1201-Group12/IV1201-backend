const userRepository = require('../repositories/userRepository');
const {
  cookieConfigLogin,
  cookieConfigLogout,
} = require('../config/cookie-config');
const { comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');
const { ValidationError } = require('sequelize');

module.exports = {
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
  logout: async (req, res) => {
    res.cookie('ACCESSTOKEN', 'none', cookieConfigLogout());
    res.status(200).json({ message: 'Logged out' });
  },
};
