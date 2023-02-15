const userRepository = require('../repositories/userRepository');
const { comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

module.exports = {
  createApplicant: async (req, res) => {
    req.body.role = 'applicant';
    // await userRepository.createApplicant(req.body);
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
      .cookie('ACCESSTOKEN', token, {
        httpOnly: true,
        sameSite: 'Strict',
        maxAge: 60 * 60 * 1000, //1h
      })
      .status(200)
      .json({ username: existingUser.username, role: existingUser.role });
  },
  logout: async (req, res) => {
    res.cookie('ACCESSTOKEN', 'none', {
      maxAge: 5 * 1000, //5s
      httpOnly: true,
      sameSite: 'Strict',
    });
    res.status(200).json({ message: 'Logged out' });
  },
};
