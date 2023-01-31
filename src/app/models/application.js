module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define(
    'application',
    {
      applicant: DataTypes.TEXT,
      status: DataTypes.TEXT,
    },
    {
      timestamps: false,
    },
  );

  return Application;
};
