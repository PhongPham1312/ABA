'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    zalo: DataTypes.STRING,
    image_t: DataTypes.STRING,
    image_s: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};