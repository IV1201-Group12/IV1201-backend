module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      firstname: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        validate: {
          isEmail: true,
        },
      },
      pnr: {
        type: DataTypes.TEXT,
        validate: {
          // isValidPnr(value) {
          //   if (Number.isNaN(value))
          //     throw new Error('Person number is not valid.');

          //   if (value.length !== 12)
          //     throw new Error('Person number is not valid.');
          isNumeric: true,
          len: [12],
        },
      },
      username: {
        type: DataTypes.TEXT,
        unique: true,
      },
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
