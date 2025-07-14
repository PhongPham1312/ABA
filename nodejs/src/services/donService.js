// services/donService.js
import db from '../models';

export const createDon = async (data) => {
  try {
    if (!data.name || !data.ngaymua || !data.nguoiban) {
      return {
        errCode: 1,
        message: 'Thiếu thông tin bắt buộc tên máy và ngày mua',
      };
    }

    const newDon = await db.Don.create({
      ngaymua: data.ngaymua,
      ngaydon: data.ngaydon || null,
      nguoiban: data.nguoiban,
      dienthoai: data.dienthoai ,

      name: data.name,
      somay: data.somay || '...',
      seri: data.seri || "...",
      gia: data.gia,
      hinhthucthu: data.hinhthucthu ,
      hinhthucthuloai: data.hinhthucthuloai ,
      hinhthucthungay: data.hinhthucthungay ,

      mau: data.mau || null ,
      vo: data.vo || null,
      dungluong: data.dungluong || null,
      ram: data.ram || null,
      pin: data.pin || null,
      face: data.face || null,
      touch: data.touch || null,
      icloud: data.icloud || null,
      main: data.main || null,
      man: data.man || null,

      donmonth: data.donmonth || null,
      status: 1,

      
    });

    return {
      errCode: 0,
      message: 'Tạo đơn thành công',
      don: newDon,
    };
  } catch (e) {
    console.error(e);
    return {
      errCode: -1,
      message: 'Lỗi server khi tạo đơn',
    };
  }
};

export const getAllDon = async () => {
  try {
    const data = await db.Don.findAll({
      order: [['createdAt', 'DESC']],
    });

    return {
      errCode: 0,
      message: 'Lấy danh sách đơn thành công',
      data,
    };
  } catch (e) {
    console.error(e);
    return {
      errCode: -1,
      message: 'Lỗi server khi lấy danh sách đơn',
    };
  }
};


module.exports = {
    createDon: createDon,
    getAllDon: getAllDon
}