'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tienmat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  Tienmat.init({
    content: DataTypes.STRING,
    money: DataTypes.INTEGER,
    ngay: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    link: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Tienmat',
  });
  return Tienmat;
};