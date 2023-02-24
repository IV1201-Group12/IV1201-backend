const { isValid } = require('../utils/validation');
const {
  isValidYearsOfExperiance,
} = require('../validators/competenceValidators');

module.exports = (sequelize, DataTypes) => {
  const Competence = sequelize.define(
    'competence',
    {
      name: {
        type: DataTypes.ENUM(
          'ticket sales',
          'lotteries',
          'roller coaster operation',
        ),
        allowNull: false,
      },
      years_of_experience: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          validate(value) {
            isValid(
              value,
              isValidYearsOfExperiance,
              'Years of experience is not valid',
            );
          },
        },
      },
    },
    {
      timestamps: false,
    },
  );
  return Competence;
};
