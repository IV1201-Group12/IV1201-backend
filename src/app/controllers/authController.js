const userRepository = require('../repositories/userRepository');
const Validators = require('../utils/validators');
const { comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

module.exports = {
  createApplicant: async (req, res) => {
    try {
      if (
        !Validators.isString(req.body.firstname) ||
        req.body.firstname.length < 1
      )
        throw new Error('Name is not valid');
      else if (
        !Validators.isString(req.body.lastname) ||
        req.body.lastname.length < 1
      )
        throw new Error('Surname is not valid');
      else if (!Validators.isValidEmail(req.body.email))
        throw new Error('Email is not valid');
      else if (!Validators.isValidPnr(req.body.pnr))
        throw new Error('Person number is not valid');
      req.body.role = 'applicant';
      await userRepository.createApplicant(req.body);
      res.status(201).send();
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await userRepository.getExistingUser(username);
    if (!existingUser) {
      //todo
      return res.status(401).send("error - doesn't exist");
    }
    const validPass = await comparePassword(password, existingUser.password);
    if (!validPass) {
      //todo
      return res.status(401).send('error - wrong pass');
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
