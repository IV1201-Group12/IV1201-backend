const db = require('../integration/RecruitmentDAO');

module.exports = {
  getAllApplications: async (req, res) => {
    try {
      const applications = await db.findAllApplications();
      console.log(applications);
      res.json(applications);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
