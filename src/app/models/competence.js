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
      },
    },
    {
      timestamps: false,
    },
  );
  return Competence;
};
