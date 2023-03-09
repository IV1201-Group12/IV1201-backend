/**
 * This module sets up the integration with the database using sequelize.
 * It creates all models and their associations and configures the connection
 * for sequelize to use. Finally it starts the connection and exports an object
 * with models and the sequelize object itself for other modules to use as an interface.
 */

const dbConfig = require('../config/db-config');
const { Sequelize, DataTypes } = require('sequelize');
const cls = require('cls-hooked');
const defineApplicationModel = require('../models/application');
const defineUserModel = require('../models/user');
const defineAvailabilityModel = require('../models/availability');
const defineCompetenceModel = require('../models/competence');
const { generateHash } = require('../utils/bcrypt');

/**
 * Creates a namespace to enable automatic inclusion of queries in transactions.
 */
const namespace = cls.createNamespace('global');
Sequelize.useCLS(namespace);

/**
 * Configures the Sequelize instance to be used by the application.
 */
let sequelize;

/**
 * Instantiate Sequelize object with db configuration
 */
// TODO: temp fix to get production up
if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABSE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
    },
  });
} else {
  sequelize = new Sequelize(
    dbConfig.NAME,
    dbConfig.USERNAME,
    dbConfig.PASSWORD,
    {
      host: dbConfig.HOST,
      port: dbConfig.PORT,
      dialect: dbConfig.DIALECT,
    },
  );
}

/**
 * Defines the models for sequelize to use.
 */
const Application = defineApplicationModel(sequelize, DataTypes);
const User = defineUserModel(sequelize, DataTypes);
const Availability = defineAvailabilityModel(sequelize, DataTypes);
const Competence = defineCompetenceModel(sequelize, DataTypes);

/**
 * Defines the associations between the models.
 */
User.hasMany(Application, { foreignKey: 'applicantId' });
Application.belongsTo(User, { as: 'applicant' });

Application.hasMany(Competence);
Competence.belongsTo(Application);

Application.hasMany(Availability);
Availability.belongsTo(Application);

/**
 * The object to be exported and used as an interface for other modules.
 */
const db = {
  sequelize: sequelize,
  models: {
    Application: Application,
    User: User,
    Availability: Availability,
    Competence: Competence,
  },
  /**
   * Starts the connection with assigned configuration.
   */
  async init() {
    try {
      if (process.env.NODE_ENV === 'acctest') {
        await sequelize.sync({ force: true });
        await sequelize.transaction(async () => {
          await User.create({
            firstname: 'test',
            lastname: 'lastname',
            email: 'email@email.com',
            pnr: '111111111125',
            username: 'testuser',
            password: await generateHash('password123'),
            role: 'applicant',
          });
          await User.create({
            firstname: 'test',
            lastname: 'lastname2',
            email: 'email2@email.com',
            pnr: '111111111126',
            username: 'testuser2',
            password: await generateHash('password1234'),
            role: 'applicant',
          });
          await User.create({
            firstname: 'test',
            lastname: 'lastname',
            email: 'adminemail@email.com',
            pnr: '111111111127',
            username: 'admin',
            password: await generateHash('admin'),
            role: 'recruiter',
          });
          await Application.create({ applicantId: 1 });
          await Availability.create({
            from_date: '2024-05-01 00:00:00',
            to_date: '2024-06-01 00:00:00',
            applicationId: 1,
          });
          await Competence.create({
            name: 'ticket sales',
            years_of_experience: 2,
            applicationId: 1,
          });
          await Application.create({ applicantId: 2 });
          await Availability.create({
            from_date: '2024-05-01 00:00:00',
            to_date: '2024-06-01 00:00:00',
            applicationId: 2,
          });
          await Competence.create({
            name: 'ticket sales',
            years_of_experience: 2,
            applicationId: 2,
          });
        });
      } else {
        await sequelize.sync();
      }
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  },
};

module.exports = db;
