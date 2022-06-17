const { sequelize, DataTypes, HasOne } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define("Subject", {
    code: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    program: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    hasBarrier: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    hasConcurrent: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    barrier: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    concurrent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  return Subject;
};
