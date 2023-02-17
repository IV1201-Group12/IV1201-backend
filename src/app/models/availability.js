module.exports = (sequelize, DataTypes) => {
  const Availability = sequelize.define(
    'availability',
    {
      from_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      to_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );
  return Availability;
};
