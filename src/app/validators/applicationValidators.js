module.exports = {
  isValidVersion(value) {
    return value > 0;
  },
  isValidStatus(value) {
    if (value === 'unhandled' || value === 'rejected' || value === 'accepted')
      return true;
    else return false;
  },
};
