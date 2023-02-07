module.exports = {
  isString(value) {
    return typeof value === 'string';
  },

  isValidPnr(value) {
    return true;
    let pnrToString;
    if (Number.isInteger(value)) {
      pnrToString = value.toString();
    } else {
      return false;
    }
    if (pnrToString.length === 12) return true;
    else return false;
  },

  isValidEmail(value) {
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (value.match(regex)) return true;

    return false;
  },
};
