module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define(
    'application',
    {
      status: {
        type: DataTypes.ENUM('rejected', 'accepted', 'unhandled'),
        allowNull: false,
        defaultValue: 'unhandled',
      },
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
