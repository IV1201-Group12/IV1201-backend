const applicationRepository = require('../repositories/applicationRepository');
const database = require('../integration/database');
module.exports = {
  getAllApplications: async (req, res) => {
    return database.sequelize.transaction(async () => {
      try {
        const applications = await applicationRepository.findAllApplications();
        res.json(applications);
      } catch (err) {
        res.status(500).send(err);
      }
    });
  },

  getApplication: async (req, res) => {
    return database.sequelize.transaction(async () => {
      try {
        const application = await applicationRepository.findApplicationById(
          req.params.id,
        );
        res.json(application);
      } catch (err) {
        res.status(500).send(err);
      }
    });
  },
  changeStatusOfApplication: async (req, res) => {
    return database.sequelize.transaction(async () => {
      try {
        let currentApplicationVersion =
          await applicationRepository.findCurrentApplicationVersionById(
            req.body.id,
          );
        currentApplicationVersion =
          currentApplicationVersion.dataValues.version;
        console.log('currentapp' + currentApplicationVersion);
        console.log('version' + req.body.version);
        if (currentApplicationVersion !== req.body.version) {
          return res
            .status(409)
            .send('The current application is being modified by another user');
        }
        const incrementedVersion = req.body.version + 1;
        await applicationRepository.updateStatus(req.body.status, req.body.id);
        await applicationRepository.updateVersion(
          incrementedVersion,
          req.body.id,
        );
        res.status(201).send();
      } catch (err) {
        res.status(500).send(err);
      }
    });
  },
};
