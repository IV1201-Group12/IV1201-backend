module.exports = (sequelize, DataTypes) => {
  const Availability = sequelize.define(
    'availability',
    {
      from_date: {
        type: DataTypes.DATEONLY,
      },
      to_date: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      timestamps: false,
    },
  );
  return Availability;
};
