'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kho extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kho.belongsTo(models.Khomonth, {foreignKey: 'id', as: 'khomonth'} );
    }
  };
  Kho.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Kho',
  });
  return Kho;
};