'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lich extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  Lich.init({
    userid: DataTypes.STRING,
    ngay: DataTypes.INTEGER,
    ca: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Lich',
  });
  return Lich;
};