const { generateHashSync } = require('../utils/bcrypt');
const dbConfig = require('../config/db-config');
const { Sequelize, DataTypes } = require('sequelize');
//temp

const users = [
  { username: 'edvin', password: generateHashSync('pass'), role: 'user' },
  { username: 'edvin2', password: generateHashSync('pass2'), role: 'admin' },
];
//

const sequelize = new Sequelize(
  dbConfig.NAME,
  dbConfig.USERNAME,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.DIALECT,
  },
);

const models = {
  Application: require('../models/application')(sequelize, DataTypes),
};

(async () => {
  try {
    await sequelize.sync();
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
    applicant.password = generateHashSync(applicant.password);
    await queryInterface.bulkInsert('person', [applicant]);
  },

  findAllApplications: async () => {
    return await models.Application.findAll();
  },
};
