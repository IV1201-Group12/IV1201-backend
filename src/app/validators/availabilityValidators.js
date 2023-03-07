module.exports = {
  isValidDate(value) {
    const nonDateParseableValue = (input) => {
      return new Date(input).toString() !== 'Invalid Date';
    };
    if (!nonDateParseableValue(value)) return false;
    if (
      new Date(value).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0)
    ) {
      return false;
    }
    return true;
  },
};
