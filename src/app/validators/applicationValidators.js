/**
 * This module exports validator functions for the application model.
 */
module.exports = {
  isValidVersion(value) {
    if (!Number.isInteger(value)) return false;
    return value > 0;
  },
  isValidStatus(value) {
    if (value === 'unhandled' || value === 'rejected' || value === 'accepted')
      return true;
    else return false;
  },
};
