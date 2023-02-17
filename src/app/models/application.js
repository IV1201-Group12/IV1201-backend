module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define(
    'application',
    {
      status: DataTypes.TEXT,
      version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      // TODO: add validation rules here
      timestamps: false,
    },
  );

  return Application;
};
