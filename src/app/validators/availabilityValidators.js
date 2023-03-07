/**
 * This module exports validator functions for the availability model.
 */
module.exports = {
  isValidDate(value) {
    const innerIsValidDate = (input) => {
      return new Date(input).toString !== 'Invalid Date';
    };
    if (!innerIsValidDate(value)) return false;
    if (
      new Date(value).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0)
    ) {
      return false;
    }
    return true;
  },
};
