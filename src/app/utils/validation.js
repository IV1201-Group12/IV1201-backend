const { ValidationError } = require('sequelize');

module.exports = {
  isValid(value, callback, msg) {
    if (!callback(value)) throw new ValidationError(msg);
  },
};
