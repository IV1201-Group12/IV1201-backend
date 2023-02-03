const applicationRepository = require('../repositories/applicationRepository');

module.exports = {
  getAllApplications: async (req, res) => {
    try {
      const applications = await applicationRepository.findAllApplications();
      res.json(applications);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
