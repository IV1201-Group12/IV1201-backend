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

  getApplication: async (req, res) => {
    try {
      /*const application = await applicationRepository.findApplicationById(
        req.params.id,
      );
      */
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
