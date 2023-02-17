const db = require('../integration/database');

const Application = db.models.Application;
const User = db.models.User;
const Availability = db.models.Availability;
const Competence = db.models.Competence;

module.exports = {
  findAllApplications: async () => {
    return await Application.findAll({
      attributes: ['id', 'status'],
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: ['firstname', 'lastname'],
        },
      ],
    });
  },

  findApplicationById: async (id) => {
    return await Application.findOne({
      where: { id },
      attributes: ['status', 'version'],
      include: [
        {
          model: User,
          as: 'applicant',
          attributes: ['firstname', 'lastname', 'email', 'pnr'],
        },
        {
          model: Competence,
          attributes: ['name', 'years_of_experience'],
        },
        {
          model: Availability,
          attributes: ['from_date', 'to_date'],
        },
      ],
    });
  },
  updateStatus: async (status, id) => {
    return await Application.update({ status }, { where: { id } });
  },
  findCurrentApplicationVersionById: async (id) => {
    return await Application.findOne({
      where: { id },
      attributes: ['version'],
    });
  },
  updateVersion: async (version, id) => {
    return await Application.update({ version }, { where: { id } });
  },
};
