module.exports = (sequelize, DataTypes) => {
  const Competence = sequelize.define(
    'competence',
    {
      name: {
        type: DataTypes.TEXT,
      },
      years_of_experience: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    },
  );
  return Competence;
};
