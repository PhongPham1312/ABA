'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Position.hasMany(models.User, { foreignKey: 'role', as: 'positionUser' });
    }
  };
  Position.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Position',
  });
  return Position;
};