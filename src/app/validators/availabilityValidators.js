/**
 * This module exports validator functions for the availability model.
 */
module.exports = {
  isValidDate(value) {
    if (value.setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0)) {
      return false;
    }
    return true;
  },
};
