'use strict';

const { Model } = require('sequelize');
const role = require('./role');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role, {
        through: "userRoles",
        foreignkeys: "userId",
        otherKey: "roleId"
      })
    }
  }
  User.init({
    //buat variable atau colloumnya
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};