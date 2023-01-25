const things = [
  { id: 1, text: 'first' },
  { id: 2, text: 'second' },
];

module.exports = {
  getAllThings: () => {
    return things;
  },
  getThing: (id) => {
    return things.find((entry) => entry.id == id);
  },
};
