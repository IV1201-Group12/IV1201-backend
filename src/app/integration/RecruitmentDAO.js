const dbConfig = require('../config/db-config');
const { Sequelize, DataTypes } = require('sequelize');
const defineApplicationModel = require('../models/application');
const defineUserModel = require('../models/user');

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

// Define models
const Application = defineApplicationModel(sequelize, DataTypes);
const User = defineUserModel(sequelize, DataTypes);

// Define relationships
// TODO: enforce that applications can only associate with a user model with role applicant
User.hasMany(Application, { foreignKey: 'applicantId' });
Application.belongsTo(User, { as: 'applicant', foreignKey: 'applicantId' });

// Define exportable
const db = {
  sequelize: sequelize,
  models: {
    Application: Application,
    User: User,
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
