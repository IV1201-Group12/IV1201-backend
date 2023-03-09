const userRepository = require('../repositories/userRepository');
/**
 * This module exports an object containing all the controller functions that handle
 * endpoints related to users.
 */

module.exports = {
  /**
  An asynchronous function that retrieves a single user by its ID from the user repository
  using the findUserById method and returns it as a JSON response.
  If an error occurs during the process, the function returns a 500 Internal Server Error response.
  @param {*} req The HTTP request object.
  @param {*} res The HTTP response object.
  @returns A JSON response containing the application retrieved from the repository.
  If an error occurs, a 500 Internal Server Error response is returned with the error message.
  */
  getUser: async (req, res) => {
    try {
      const user = await userRepository.findUserById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
