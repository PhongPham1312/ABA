'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Thuchinam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /* Thuchinam.belongsTo(models.Thuchinammonth, {foreignKey: 'id', as: 'Thuchinammonth'} ); */
    }
  };
  Thuchinam.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Thuchinam',
  });
  return Thuchinam;
};