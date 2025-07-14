'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
       Job.hasMany(models.User, { foreignKey: 'job', as: 'JobUser' });
    }
  };
  Job.init({
    name: DataTypes.STRING,
    money: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};