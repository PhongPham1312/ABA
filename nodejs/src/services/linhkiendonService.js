// services/linhkienService.js

import db from '../models';

const createLinhKienDon = async (data) => {
  try {
    const { donmay, linhkien, linhkiengia, linhkienngay, linhkienuser, loaitien } = data;

    // Kiểm tra bắt buộc
    if (!donmay || !linhkien) {
      return {
        errCode: 1,
        message: 'Thiếu mã đơn máy hoặc linh kiện'
      };
    }

    const newRecord = await db.Linhkiendon.create({
      donmay,
      linhkien,
      linhkiengia,
      linhkienngay,
      linhkienuser,
      loaitien,
    });

    return {
      errCode: 0,
      message: 'Tạo linh kiện đơn thành công',
      data: newRecord,
    };
  } catch (e) {
    console.error('CreateLinhKienDon Error:', e);
    return {
      errCode: -1,
      message: 'Lỗi server khi tạo linh kiện đơn',
    };
  }
};


// services/linhkienService.js

const getAllLinhKienDon = async () => {
  try {
    const data = await db.Linhkiendon.findAll();

    return {
      errCode: 0,
      message: 'Lấy danh sách linh kiện đơn thành công',
      data
    };
  } catch (e) {
    console.error('getAllLinhKienDon Error:', e);
    return {
      errCode: -1,
      message: 'Lỗi server khi lấy danh sách linh kiện đơn',
    };
  }
};

const getAllLinhkienByDonmay = async (donmayId) => {
  try {
    if (!donmayId) {
      return {
        errCode: 1,
        message: 'Thiếu id đơn máy!'
      };
    }

    const linhkiens = await db.Linhkiendon.findAll({
      where: { donmay: donmayId }
    });

    return {
      errCode: 0,
      data: linhkiens
    };
  } catch (e) {
    console.error('Error in getAllLinhkienByDonmay:', e);
    return {
      errCode: -1,
      message: 'Lỗi server!'
    };
  }
};

const deleteLinhkiendon = async (id) => {
    try {
        const linhkien = await db.Linhkiendon.findOne({
            where: { id: id }
        });

        if (!linhkien) {
            return {
                errCode: 1,
                errMessage: 'Linh kiện không tồn tại!'
            };
        }

        await db.Linhkiendon.destroy({
            where: { id: id }
        });

        return {
            errCode: 0,
            message: 'Xóa thành công!'
        };
    } catch (e) {
        console.error(e);
        return {
            errCode: -1,
            errMessage: 'Lỗi từ server!'
        };
    }
};


module.exports = {
  getAllLinhKienDon: getAllLinhKienDon,
  createLinhKienDon : createLinhKienDon,
  getAllLinhkienByDonmay: getAllLinhkienByDonmay,
  deleteLinhkiendon: deleteLinhkiendon
}