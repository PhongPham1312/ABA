'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class May extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  May.init({
    name: DataTypes.STRING,
    money: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'May',
  });
  return May;
};