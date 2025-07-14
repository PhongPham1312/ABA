'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }

  };
  Phone.init({
    name: DataTypes.STRING,
    somay: DataTypes.STRING,
    seri: DataTypes.STRING,
    gia: DataTypes.STRING,
    mau: DataTypes.STRING,
    vo: DataTypes.STRING,
    dungluong: DataTypes.STRING,
    ram: DataTypes.STRING,
    pin: DataTypes.STRING,
    face: DataTypes.STRING,
    touch: DataTypes.STRING,
    icloud: DataTypes.STRING,
    main: DataTypes.STRING,
    man: DataTypes.STRING,
    phonemonth: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Phone',
  });
  return Phone;
};