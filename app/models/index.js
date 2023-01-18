'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

//setup connection db
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  //kalo ga pake .env langsung ke config.json
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//define class modell ke sequilize orm
fs
//baca dulu file yang ada di module model
  .readdirSync(__dirname)
  .filter(file => {
    //ngefilter sessionya
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  //abis itu di looping
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    //kemudian di register di dbnya
    db[model.name] = model;
  });

  //setup relation
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
