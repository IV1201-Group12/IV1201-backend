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
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      pnr: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [12],
        },
      },
      username: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('applicant', 'recruiter'),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  return User;
};
