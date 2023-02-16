const db = require('../integration/RecruitmentDAO');
const { generateHash } = require('../utils/bcrypt');

const User = db.models.User;

module.exports = {
  createApplicant: async (applicant) => {
    applicant.password = await generateHash(applicant.password);
    await User.create(applicant);
  },
  getExistingUser: async (username) => {
    return await User.findOne({ where: { username: username } });
  },
};
