'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Khomonth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Khomonth.hasMany(models.Kho, { foreignKey: 'id', as: 'khomonth' });
    }
  };
  Khomonth.init({
    name: DataTypes.STRING,
    parent: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Khomonth',
  });
  return Khomonth;
};