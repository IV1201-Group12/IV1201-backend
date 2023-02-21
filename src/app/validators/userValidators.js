module.exports = {
  isString(value) {
    return typeof value === 'string';
  },

  isValidName(value) {
    return value.length > 1;
  },

  isValidEmail(value) {
    if (!value) return false;
    const regex = /^^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (value.match(regex)) return true;

    return false;
  },

  isValidPnr(value) {
    if (!value) return false;
    if (isNaN(value)) return false;

    if (value.length === 12) return true;
    else return false;
  },

  isValidUsername(value) {
    return value.length > 3;
  },

  isValidPassword(value) {
    return value.length > 3;
  },
};
