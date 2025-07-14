'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Dons', {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ngaymua: {
        type: Sequelize.STRING
      },
      ngaydon: {
        type: Sequelize.STRING
      },
      nguoiban: {
        type: Sequelize.STRING
      },
      dienthoai: {
        type: Sequelize.STRING
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
      hinhthucthu: {
        type: Sequelize.STRING
      },
      hinhthucthuloai: {
        type: Sequelize.STRING
      },
      hinhthucthungay: {
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
      donmonth: {
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
    await queryInterface.dropTable('Dons');
  }
};