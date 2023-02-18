const applicationRepository = require('../repositories/applicationRepository');
const database = require('../integration/database');

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
      const application = await applicationRepository.findApplicationById(
        req.params.id,
      );
      res.json(application);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  changeStatusOfApplication: async (req, res) => {
    try {
      await applicationRepository.updateStatus(
        req.body.status,
        req.body.version,
        req.body.id,
      );
      res.status(200).send();
    } catch (err) {
      if (err === 'version mismatch')
        return res.status(409).send('version mismatch');
      else res.status(500).send(err);
    }
  },
};
