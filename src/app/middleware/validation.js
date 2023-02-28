const userValidators = require('../validators/userValidators');
const applicationValidators = require('../validators/applicationValidators');

//Se till att skicka samma strings som i modellagrets felmeddelanden så borde frontend funka
module.exports = {
  validateRegister: (req, res, next) => {
    try {
      if (!userValidators.isValidName(req.body.firstname))
        throw new Error('Firstname is not valid');
      else if (!userValidators.isValidName(req.body.lastname))
        throw new Error('Lastname is not valid');
      else if (!userValidators.isValidEmail(req.body.email))
        throw new Error('Email is not valid');
      else if (!userValidators.isValidPnr(req.body.pnr))
        throw new Error('Pnr is not valid');
      else if (!userValidators.isValidPassword(req.body.password))
        throw new Error('Password is not valid');
      else if (!userValidators.isValidUsername(req.body.username))
        throw new Error('Username is not valid');
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
  validateChangeStatusOfApplication: (req, res, next) => {
    try {
      if (!applicationValidators.isValidStatus(req.body.status))
        throw new Error('Status is not valid');
      if (!applicationValidators.isValidVersion(req.body.status))
        throw new Error('Status is not valid');
      return next();
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
};
