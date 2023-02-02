module.exports = (sequelize, DataTypes) => {
  const Applicant = sequelize.define(
    'applicant',
    {
      firstname: DataTypes.TEXT,
      lastname: DataTypes.TEXT,
      email: DataTypes.TEXT,
      pnr: DataTypes.TEXT,
      username: DataTypes.TEXT,
      password: DataTypes.TEXT,
    },
    {
      // TODO: add validation rules here
      timestamps: false,
    },
  );

  return Applicant;
};
