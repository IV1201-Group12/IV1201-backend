module.exports = {
  isString(value) {
    return typeof value === 'string';
  },

  isValidFirstname(value) {
    return true;
  },

  isValidLastname(value) {
    return true;
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
    return true;
  },

  isValidPassword(value) {
    return true;
  },
};
