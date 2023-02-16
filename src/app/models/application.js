module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define(
    'application',
    {
      status: DataTypes.TEXT,
    },
    {
      // TODO: add validation rules here
      timestamps: false,
    },
  );

  return Application;
};
