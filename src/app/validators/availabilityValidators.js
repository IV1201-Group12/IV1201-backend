/**
 * This module exports validator functions for the availability model.
 */
module.exports = {
  isValidFromDate(value) {
    return !(Date.parse(value) - Date.parse(new Date()) > 0);
  },
  isValidToDate(value) {
    return !(Date.parse(value) - Date.parse(new Date()) > 0);
  },
};
