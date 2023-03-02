/**
 * Defines the application model including constraints and validation.
 */

const { isValid } = require('../utils/validation');
const { isValidVersion } = require('../validators/applicationValidators');

module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define(
    'application',
    {
      status: {
        type: DataTypes.ENUM('rejected', 'accepted', 'unhandled'),
        allowNull: false,
        defaultValue: 'unhandled',
      },
      version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          validate(value) {
            isValid(value, isValidVersion, 'Version is not valid');
          },
        },
      },
    },
    {
      timestamps: false,
    },
  );

  return Application;
};
