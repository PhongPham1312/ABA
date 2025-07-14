'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Iclouds', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      donmay: {
        type: Sequelize.STRING
      },
      gia: {
        type: Sequelize.STRING
      },
      ngay: {
        type: Sequelize.STRING
      },
      user: {
        type: Sequelize.STRING
      },
      loaitien: {
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
    await queryInterface.dropTable('Iclouds');
  }
};