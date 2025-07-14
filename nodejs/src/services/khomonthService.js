import db from '../models/index';
// Thêm mới
const createKhomonth = async (data) => {
  try {
    if (!data.name) {
      return {
        errCode: 1,
        message: 'Thiếu tên kho hàng tháng'
      };
    }

    // Kiểm tra trùng tên
    const existed = await db.Khomonth.findOne({ where: { name: data.name } });
    if (existed) {
      return {
        errCode: 2,
        message: 'Tên kho hàng tháng đã tồn tại'
      };
    }

    const newItem = await db.Khomonth.create({
      name: data.name,
      parent: data.parent || null
    });

    return {
      errCode: 0,
      message: 'Tạo thành công',
      data: newItem
    };
  } catch (error) {
    console.error(error);
    return {
      errCode: -1,
      message: 'Lỗi server'
    };
  }
};

// Xóa
const deleteKhomonth = async (id) => {
  try {
    const item = await db.Khomonth.findOne({ where: { id } });

    if (!item) {
      return {
        errCode: 1,
        message: 'Không tìm thấy kho hàng'
      };
    }

    await db.Khomonth.destroy({ where: { id } });

    return {
      errCode: 0,
      message: 'Xóa thành công'
    };
  } catch (error) {
    console.error(error);
    return {
      errCode: -1,
      message: 'Lỗi server'
    };
  }
};

const getAllKhomonth = async () => {
  try {
    const data = await db.Khomonth.findAll({
      order: [['id', 'DESC']] // Sắp xếp theo id giảm dần (tuỳ bạn)
    });

    return {
      errCode: 0,
      message: 'Lấy danh sách thành công',
      data: data
    };
  } catch (error) {
    console.error(error);
    return {
      errCode: -1,
      message: 'Lỗi server'
    };
  }
};



module.exports = {
    createKhomonth : createKhomonth,
    deleteKhomonth: deleteKhomonth,
    getAllKhomonth: getAllKhomonth
}