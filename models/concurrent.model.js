const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Concurrent = sequelize.define("Concurrent", {
    concurrent: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });

  return Concurrent;
};
