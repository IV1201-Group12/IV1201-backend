module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstname: DataTypes.TEXT,
      lastname: DataTypes.TEXT,
      email: DataTypes.TEXT,
      pnr: DataTypes.TEXT,
      username: DataTypes.TEXT,
      password: DataTypes.TEXT,
      // TODO: use enum instead
      role: DataTypes.TEXT,
    },
    {
      // TODO: add validation rules here
      timestamps: false,
    },
  );

  return User;
};
