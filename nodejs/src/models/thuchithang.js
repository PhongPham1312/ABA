'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Thuchithang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      /* Thuchithang.belongsTo(models.Thuchithangmonth, {foreignKey: 'id', as: 'Thuchithangmonth'} ); */
    }
  };
  Thuchithang.init({
    name: DataTypes.STRING,
    parent: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Thuchithang',
  });
  return Thuchithang;
};