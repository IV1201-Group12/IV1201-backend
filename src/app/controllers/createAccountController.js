const RecruitmentDAO = require('../integration/RecruitmentDAO');
const Validators = require('../utils/validators');

module.exports = {
  createApplicant: async (req, res, next) => {
    try {
      if (!Validators.isString(req.body.name))
        throw new Error('Name is not valid');
      else if (!Validators.isString(req.body.surname))
        throw new Error('Surname is not valid');
      else if (!Validators.isValidEmail(req.body.email))
        throw new Error('Email is not valid');
      else if (!Validators.isValidPnr(req.body.pnr))
        throw new Error('Person number is not valid');
      await RecruitmentDAO.createApplicant(req.body);
      res.status(201).send();
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
