const Validators = require('../validators/userValidators');

module.exports = {
  validateRegister: (req, res, next) => {
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
      else if (!req.body.password) throw new Error('Password is not valid');
      else if (!req.body.username) throw new Error('Username is not valid');
      return next();
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  validateLogin: (req, res, next) => {
    try {
      if (!req.body.username) throw new Error('Enter a username');
      else if (!req.body.password) throw new Error('Enter a password');
      return next();
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
};
