const { generateHashSync } = require('../utils/bcrypt');
const { Sequelize } = require('sequelize');

const users = [
  { username: 'edvin', password: generateHashSync('pass') },
  { username: 'edvin2', password: generateHashSync('pass2') },
];

const sequelize = new Sequelize(
  'recruitment_application',
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
  },
);

sequelize.sync();

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const queryInterface = sequelize.getQueryInterface();

module.exports = {
  getExistingUser: (username) => {
    return users.find((user) => user.username === username);
  },

  createApplicant: async (applicant) => {
    await queryInterface.bulkInsert('person', [applicant]);
  },
};
