"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.subjects = require("./subject.model")(sequelize, Sequelize);
db.barriers = require("./barrier.model")(sequelize, Sequelize);
db.concurrents = require("./concurrent.model")(sequelize, Sequelize);
db.students = require("./student.model")(sequelize, Sequelize);
db.status = require("./status.model")(sequelize, Sequelize);
db.subjects.hasOne(db.barriers, { as: "barriers", foreignKey: "code" });
db.barriers.belongsTo(db.subjects);
db.subjects.hasOne(db.concurrents, {
  as: "concurrents",
  foreignKey: "code",
});
db.concurrents.belongsTo(db.subjects);

module.exports = db;
