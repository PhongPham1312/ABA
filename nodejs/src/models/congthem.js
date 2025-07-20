'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Congthem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  Congthem.init({
    userid: DataTypes.STRING,
    ngay: DataTypes.STRING,
    congthem: DataTypes.STRING,
    thanhtien: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Congthem',
  });
  return Congthem;
};