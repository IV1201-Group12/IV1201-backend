const db = require('../integration/RecruitmentDAO');
const { generateHashSync } = require('../utils/bcrypt');

const Applicant = db.models.Applicant;

// Testing data
const users = [
  { username: 'edvin', password: generateHashSync('pass'), role: 'user' },
  { username: 'edvin2', password: generateHashSync('pass2'), role: 'admin' },
];

// TODO: maybe scrap the applicant and recruiter models and use a user model instead
module.exports = {
  // TODO: implement with model functions
  createApplicant: async (applicant) => {
    applicant.password = generateHashSync(applicant.password);
    await Applicant.create({ firstname: 'test' });
  },
  // TODO: implement with model functions
  getExistingUser: (username) => {
    return users.find((user) => user.username === username);
  },
};
