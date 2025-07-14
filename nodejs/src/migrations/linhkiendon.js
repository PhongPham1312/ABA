'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Linhkiendons', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      donmay: {
        type: Sequelize.STRING
      },
      linhkien: {
        type: Sequelize.STRING
      },
      linhkiengia: {
        type: Sequelize.STRING
      },
      linhkienngay: {
        type: Sequelize.STRING
      },
      linhkienuser: {
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
    await queryInterface.dropTable('Linhkiendons');
  }
};