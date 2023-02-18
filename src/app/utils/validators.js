module.exports = {
  isString(value) {
    return typeof value === 'string';
  },

  isValidPnr(value) {
    if (!value) return false;
    if (Number.isNaN(value)) return false;

    if (value.length === 12) return true;
    else return false;
  },

  isValidEmail(value) {
    if (!value) return false;
    const regex = /^^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (value.match(regex)) return true;

    return false;
  },
};
