const db = require('../integration/database');

const Application = db.models.Application;

module.exports = {
  findAllApplications: async () => {
    return await Application.findAll({ include: 'applicant' });
  },

  findApplicationById: async (id) => {
    console.log(id);
  },
};
