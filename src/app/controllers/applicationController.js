/**
 * This module exports an object containing all the controller functions that handle
 * endpoints related to applications.
 */
const {
  insertApplicantLink,
  insertApplicantLinks,
} = require('../utils/hateoas');
const applicationRepository = require('../repositories/applicationRepository');

module.exports = {
  /**
  An asynchronous function that retrieves all applications from the application repository
  using the findAllApplications method and returns them as a JSON response.
  If an error occurs during the process, the function returns a 500 Internal Server Error response.
  @param {*} req The HTTP request object.
  @param {*} res The HTTP response object.
  @returns A JSON response containing all applications retrieved from the repository.
  If an error occurs, a 500 Internal Server Error response is returned with the error message.
  */
  getAllApplications: async (req, res) => {
    try {
      const applications = await applicationRepository.findAllApplications();
      // console.log(JSON.parse(applications));
      insertApplicantLinks(applications);
      return res.json(applications);
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  /**
  An asynchronous function that retrieves a single application by its ID from the application repository
  using the findApplicationById method and returns it as a JSON response.
  If an error occurs during the process, the function returns a 500 Internal Server Error response.
  @param {*} req The HTTP request object.
  @param {*} res The HTTP response object.
  @returns A JSON response containing the application retrieved from the repository.
  If an error occurs, a 500 Internal Server Error response is returned with the error message.
  */
  getApplication: async (req, res) => {
    try {
      const application = await applicationRepository.findApplicationById(
        req.params.id,
      );
      insertApplicantLink(application);
      return res.json(application);
    } catch (err) {
      return res.status(500).send(err);
    }
  },

  /**
  An asynchronous function that updates the status of an application using the updateStatus method and returns a 200 OK response.
  If the version of the application in the repository does not match the version provided in the request body,
  the function returns a 409 Conflict response.
  If an error occurs during the process, the function returns a 500 Internal Server Error response.
  @param {*} req The HTTP request object.
  @param {*} res The HTTP response object.
  @returns A 200 OK response if the status is successfully updated.
  If the version of the application in the repository does not match the version provided in the request body,
  a 409 Conflict response is returned with the "version mismatch" message.
  If an error occurs, a 500 Internal Server Error response is returned with the error message.
  */
  changeStatusOfApplication: async (req, res) => {
    try {
      await applicationRepository.updateStatus(
        req.body.status,
        req.body.version,
        req.body.id,
      );
      return res.status(200).send();
    } catch (err) {
      if (err === 'version mismatch')
        return res.status(409).send('version mismatch');
      else return res.status(500).send(err);
    }
  },
};
