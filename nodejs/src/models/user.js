'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Position, {foreignKey: 'role', as: 'positionUser'} );
      User.belongsTo(models.Job, {foreignKey: 'job', as: 'jobUser'} );
    }
  };
  User.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    zalo: DataTypes.STRING,
    image_t: DataTypes.STRING,
    image_s: DataTypes.STRING,
    role: DataTypes.STRING,
    job: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};