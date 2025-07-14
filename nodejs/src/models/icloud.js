'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Icloud extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  Icloud.init({
    donmay: DataTypes.STRING,
    gia: DataTypes.INTEGER,
    ngay: DataTypes.INTEGER,
    user: DataTypes.INTEGER,
    loaitien: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Icloud',
  });
  return Icloud;
};