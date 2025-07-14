import db from '../models';

export const createGia = async (data) => {
  try {
    // Kiểm tra tên bắt buộc
    if (!data.name) {
      return {
        errCode: 1,
        message: 'Thiếu tên'
      };
    }

    // Kiểm tra đã tồn tại chưa
    const existed = await db.May.findOne({
      where: { name: data.name }
    });

    if (existed) {
      return {
        errCode: 2,
        message: 'Tên đã tồn tại'
      };
    }

    // Tạo mới
    const newGia = await db.May.create({
      name: data.name,
     gia: data.gia || ''  // nếu không có giá vẫn được
    });

    return {
      errCode: 0,
      message: 'Tạo thành công',
      data: newGia
    };

  } catch (e) {
    console.error(e);
    return {
      errCode: -1,
      message: 'Lỗi server'
    };
  }
};

const getAllMay = async () => {
  try {
    const list = await db.May.findAll({
      order: [['createdAt', 'DESC']] // sắp xếp mới nhất lên đầu
    });

    return {
      errCode: 0,
      message: 'Lấy danh sách giá thành công',
      giaList: list
    };
  } catch (e) {
    console.error(e);
    return {
      errCode: -1,
      message: 'Lỗi server'
    };
  }
};


module.exports = {
    createGia , getAllMay
}