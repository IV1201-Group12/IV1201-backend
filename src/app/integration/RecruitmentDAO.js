const dbConfig = require('../config/db-config');
const { Sequelize, DataTypes } = require('sequelize');
const defineApplicationModel = require('../models/application');
const defineApplicantModel = require('../models/applicant');
const defineRecruiterModel = require('../models/recruiter');

// Instantiate Sequelize object with db configuration
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

// Define models
const Application = defineApplicationModel(sequelize, DataTypes);
const Applicant = defineApplicantModel(sequelize, DataTypes);
const Recruiter = defineRecruiterModel(sequelize, DataTypes);

// Define relationships
Applicant.hasMany(Application);
Application.belongsTo(Applicant);

// Define exportable
const db = {
  sequelize: sequelize,
  models: {
    Application: Application,
    Applicant: Applicant,
    Recruiter: Recruiter,
  },
};

// Start db connection
(async () => {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = db;
