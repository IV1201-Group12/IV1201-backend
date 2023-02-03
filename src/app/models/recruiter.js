module.exports = (sequelize, DataTypes) => {
  const Recruiter = sequelize.define(
    'recruiter',
    {
      firstname: DataTypes.TEXT,
      lastname: DataTypes.TEXT,
      username: DataTypes.TEXT,
      password: DataTypes.TEXT,
    },
    {
      // TODO: add validation rules here
      timestamps: false,
    },
  );

  return Recruiter;
};
