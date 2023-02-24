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

// Instantiate Sequelize object with db configuration
// temp fix to get production up
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
// TODO: enforce that applications can only associate with a user model with role applicant
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
};

/**
 * Starts the connection with assigned configuration.
 */
(async () => {
  try {
    if (process.env.NODE_ENV === 'acctest') {
      await sequelize.sync({ force: true });
      await sequelize.transaction(async () => {
        await User.create({
          firstname: 'test',
          lastname: 'lastname',
          email: 'email@email.com',
          pnr: '123456789019',
          username: 'testuser',
          password: await generateHash('password123'),
          role: 'applicant',
        });
        await User.create({
          firstname: 'test',
          lastname: 'lastname',
          email: 'adminemail@email.com',
          pnr: '123456789015',
          username: 'admin',
          password: await generateHash('admin'),
          role: 'recruiter',
        });
        await Application.create({ applicantId: 1 });
        //Date is invalid. Insert an "Availability" in the database manually.
        /*await Availability.create({
          from_date: '2023-05-01',
          to_date: new Date('2023-06-01'),
          applicationId: 1,
        });*/
        await Competence.create({
          name: 'ticket sales',
          years_of_experience: 2,
          applicationId: 1,
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
})();

module.exports = db;
