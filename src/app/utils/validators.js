module.exports = {
  isString(value) {
    return typeof value === 'string';
  },

  isValidPnr(value) {
    if (Number.isNaN(value)) return false;

    if (value.length === 12) return true;
    else return false;
  },

  isValidEmail(value) {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (value.match(regex)) return true;

    return false;
  },
};
