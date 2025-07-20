'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Liches', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.STRING
      },
      ngay: {
        type: Sequelize.STRING
      },
       ca1: {
        type: Sequelize.STRING
      },
      ca2: {
        type: Sequelize.STRING
      },
      ca3: {
        type: Sequelize.STRING
      },
      ca4: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Liches');
  }
};