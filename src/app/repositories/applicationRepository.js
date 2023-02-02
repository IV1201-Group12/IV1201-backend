const db = require('../integration/RecruitmentDAO');

const Application = db.models.Application;

module.exports = {
  //TODO: insert applicant model in response
  findAllApplications: async () => {
    return await Application.findAll();
  },
};
