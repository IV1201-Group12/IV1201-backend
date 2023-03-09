module.exports = {
  isValidDate(value) {
    if (new Date(value).toString() === 'Invalid Date') return false;
    // const nonDateParseableValue = (input) => {
    //   return new Date(input).toString() !== 'Invalid Date';
    // };
    // if (!nonDateParseableValue(value)) return false;
    if (
      new Date(value).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0)
    ) {
      return false;
    }
    return true;
  },
};
