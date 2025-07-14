'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Phones', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      somay: {
        type: Sequelize.STRING
      },
      seri: {
        type: Sequelize.STRING
      },
      gia: {
        type: Sequelize.STRING
      },
      mau: {
        type: Sequelize.STRING
      },
      vo: {
        type: Sequelize.BOOLEAN
      },
      dungluong: {
        type: Sequelize.STRING
      },
      ram: {
        type: Sequelize.STRING
      },
      pin: {
        type: Sequelize.STRING
      },
      face: {
        type: Sequelize.STRING
      },
      touch: {
        type: Sequelize.STRING
      },
      icloud: {
        type: Sequelize.STRING
      },
      main: {
        type: Sequelize.STRING
      },
      man: {
        type: Sequelize.STRING
      },
      phonemonth: {
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
    await queryInterface.dropTable('Phones');
  }
};