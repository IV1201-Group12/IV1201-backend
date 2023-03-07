/**
 * This module exports functions that can be used as validation
 * middleware for endpoints that receive data from the user.
 */

const userValidators = require('../validators/userValidators');
const applicationValidators = require('../validators/applicationValidators');

module.exports = {
  /**
   * Validates the user defined data sent to the register endpoint.
   * @param {*} req HTTP request object
   * @param {*} res HTTP response object
   * @param {*} next Next function in the middleware stack
   * @returns The next functions return value if the validation succeeds,
   * otherwise, a HTTP responce with code 400 and an error message.
   */
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
  /**
   * Validates the user defined data sent to the login endpoint.
   * @param {*} req HTTP request object
   * @param {*} res HTTP response object
   * @param {*} next Next function in the middleware stack
   * @returns The next functions return value if the validation succeeds,
   * otherwise, a HTTP responce with code 400 and an error message.
   */
  validateLogin: (req, res, next) => {
    try {
      if (!req.body.username) throw new Error('Enter a username');
      else if (!req.body.password) throw new Error('Enter a password');
      return next();
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
  /**
   * Validates the user defined data sent to the update status of
   * application endpoint.
   * @param {*} req HTTP request object
   * @param {*} res HTTP response object
   * @param {*} next Next function in the middleware stack
   * @returns The next functions return value if the validation succeeds,
   * otherwise, a HTTP responce with code 400 and an error message.
   */
  validateChangeStatusOfApplication: (req, res, next) => {
    try {
      if (!applicationValidators.isValidStatus(req.body.status))
        throw new Error('Status is not valid');
      if (!applicationValidators.isValidVersion(req.body.version))
        throw new Error('Version is not valid');
      return next();
    } catch (err) {
      res.status(400).send(err.message);
    }
  },
};
