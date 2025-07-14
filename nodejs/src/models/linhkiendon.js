'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Linhkiendon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  Linhkiendon.init({
    donmay: DataTypes.STRING,
    linhkien: DataTypes.INTEGER,
    linhkiengia: DataTypes.INTEGER,
    linhkienngay: DataTypes.INTEGER,
    linhkienuser: DataTypes.INTEGER,
    loaitien: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Linhkiendon',
  });
  return Linhkiendon;
};