const thingDAO = require('../integration/thingDAO.js');

module.exports = {
  getAllThings: (req, res) => {
    try {
      const things = thingDAO.getAllThings();
      res.json(things);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getThing: (req, res) => {
    try {
      const id = req.params.id;
      const thing = thingDAO.getThing(id);
      res.json(thing);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
