'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sacombank extends Model {   
    /**
     * Helper method for defining Sacombanksociations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   
  };
  Sacombank.init({
    content: DataTypes.STRING,
    money: DataTypes.INTEGER,
    ngay: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    link: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Sacombank',
  });
  return Sacombank;
};