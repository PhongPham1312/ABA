'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Don extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }

  };
  Don.init({
    // thông tin khách
    ngaymua: DataTypes.STRING,
    ngaydon: DataTypes.STRING,
    nguoiban: DataTypes.STRING,
    dienthoai: DataTypes.STRING,
    // thông tin máy
    name: DataTypes.STRING,
    somay: DataTypes.STRING,
    seri: DataTypes.STRING,
    // giá 
    gia: DataTypes.STRING,
    // thu đổi
    hinhthucthu: DataTypes.STRING,
    hinhthucthuloai: DataTypes.STRING,
    hinhthucthungay: DataTypes.STRING,
    // thông tin giới thiệu máy
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
    // dọn tháng
    donmonth: DataTypes.STRING,
    // trạng thái dọn
    status: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Don',
  });
  return Don;
};