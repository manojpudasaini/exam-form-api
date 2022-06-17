const { sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Barrier = sequelize.define("Barrier", {
    barrier: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });

  return Barrier;
};
