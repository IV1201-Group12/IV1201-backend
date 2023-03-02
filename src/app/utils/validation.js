const { ValidationError } = require('sequelize');

/**
 * Helper functions for the validators.
 */
module.exports = {
  /**
   * This function helps reduce some code duplication in the validation
   * of the integration layer.
   * @param {*} value The value to be validated.
   * @param {*} callback The validator to use.
   * @param {*} msg The message to use if an error is thrown.
   */
  isValid(value, callback, msg) {
    if (!callback(value)) throw new ValidationError(msg);
  },
};
