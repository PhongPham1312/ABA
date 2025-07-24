// services/donService.js
import db from '../models';

const createDon = async (data) => {
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

const getAllDon = async () => {
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

const getGroupByDateService = async () => {
    try {
        const allRecords = await db.Don.findAll({
            raw: true,
            attributes: ['ngaymua', 'createdAt'],
        });

        const grouped = {};

        allRecords.forEach(item => {
            if (!item.createdAt) return;

            // Format createdAt sang yyyy-mm-dd
            const dateObj = new Date(item.createdAt);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1); // Tháng bắt đầu từ 0
            const day = String(dateObj.getDate()).padStart(2, '0');

            if (!grouped[year]) grouped[year] = {};
            if (!grouped[year][month]) grouped[year][month] = {};
            if (!grouped[year][month][day]) grouped[year][month][day] = [];

            grouped[year][month][day].push(item);
        });

        return {
            errCode: 0,
            data: grouped
        };

    } catch (e) {
        console.error(e);
        return {
            errCode: 1,
            errMessage: 'Lỗi server khi group theo ngày'
        };
    }
};

module.exports = {
    createDon: createDon,
    getAllDon: getAllDon,
    getGroupByDateService: getGroupByDateService
}