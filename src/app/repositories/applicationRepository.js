const { sequelize, models } = require('../integration/database');

const Application = models.Application;
const User = models.User;
const Availability = models.Availability;
const Competence = models.Competence;

module.exports = {
  findAllApplications: async () => {
    return await sequelize.transaction(async () => {
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
    });
  },

  findApplicationById: async (id) => {
    return await sequelize.transaction(async () => {
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
    });
  },

  updateStatus: async (newStatus, currentversion, id) => {
    return await sequelize.transaction(async () => {
      const {
        dataValues: { version },
      } = await Application.findOne({
        where: { id },
        attributes: ['version'],
      });
      if (version !== currentversion) throw 'version mismatch';
      await Application.update({ status: newStatus }, { where: { id } });
      return await Application.update(
        { version: version + 1 },
        { where: { id } },
      );
    });
  },
};
