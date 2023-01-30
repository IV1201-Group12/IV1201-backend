const RecruitmentDAO = require('../integration/RecruitmentDAO');

module.exports = {
  createApplicant: async (req, res, next) => {
    try {
      await RecruitmentDAO.createApplicant(req.body);
      res.status(201).send();
    } catch (err) {
      console.log(err);
    }
  },
};
