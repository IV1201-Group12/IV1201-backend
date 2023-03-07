/**
 * This module exports an object that functions as an interface to the database
 * for application related queries.
 */

const { sequelize, models } = require('../integration/database');

const Application = models.Application;
const User = models.User;
const Availability = models.Availability;
const Competence = models.Competence;

module.exports = {
  /**
   * An asynchronous function that queries the database for all applications.
   * @returns An object containing all applications in the database, each
   * mapped to a JS object.
   */
  findAllApplications: async () => {
    return await sequelize.transaction(async () => {
      return await Application.findAll({
        attributes: ['id', 'status'],
        include: [
          {
            model: User,
            as: 'applicant',
            attributes: ['firstname', 'lastname', 'id'],
          },
        ],
      });
    });
  },
  /**
   * This function finds a single application from the database by id.
   * @param {*} id The id of the application to find.
   * @returns A single object for an application.
   */
  findApplicationById: async (id) => {
    return await sequelize.transaction(async () => {
      return await Application.findOne({
        where: { id },
        attributes: ['status', 'version'],
        include: [
          {
            model: User,
            as: 'applicant',
            attributes: ['firstname', 'lastname', 'email', 'pnr', 'id'],
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
  /**
   * This function updates an applications status by id. It will reject
   * the request if the application is found to be out of date for the
   * requester.
   * @param {*} newStatus The new status to update the application with.
   * @param {*} currentversion The version that the application should be
   * for the request to not be rejected.
   * @param {*} id Id of the application to update.
   * @returns An object of the newly updated application.
   */
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
