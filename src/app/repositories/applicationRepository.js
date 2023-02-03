const db = require('../integration/RecruitmentDAO');

const Application = db.models.Application;
const Applicant = db.models.Applicant;

module.exports = {
  findAllApplications: async () => {
    return await Application.findAll({ include: Applicant });
  },
};
