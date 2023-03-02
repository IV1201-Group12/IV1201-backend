/**
 * Defines the user model including constraints and validation.
 */

const { isValid } = require('../utils/validation');
const {
  isValidPnr,
  isValidEmail,
  isValidUsername,
  isValidPassword,
  isValidName,
} = require('../validators/userValidators');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstname: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          validate(value) {
            isValid(value, isValidName, 'Firstname is not valid');
          },
        },
      },
      lastname: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          validate(value) {
            isValid(value, isValidName, 'Lastname is not valid');
          },
        },
      },
      email: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
        validate: {
          validate(value) {
            isValid(value, isValidEmail, 'Email is not valid');
          },
        },
      },
      pnr: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
        validate: {
          validate(value) {
            isValid(value, isValidPnr, 'Pnr is not valid');
          },
        },
      },
      username: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
        validate: {
          validate(value) {
            isValid(value, isValidUsername, 'Username is not valid');
          },
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          validate(value) {
            isValid(value, isValidPassword, 'Password is not valid');
          },
        },
      },
      role: {
        type: DataTypes.ENUM('applicant', 'recruiter'),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  return User;
};
