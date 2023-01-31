const applicationDAO = require('../integration/applicationDAO.js');

module.exports = {
  getAllApplications: (req, res) => {
    try {
      const applications = applicationDAO.getAllApplications();
      res.json(applications);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
