const userRepository = require('../repositories/userRepository');

module.exports = {
  getUser: async (req, res) => {
    try {
      const user = await userRepository.findUserById(req.params.id);
      res.json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
