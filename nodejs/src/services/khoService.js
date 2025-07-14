import db from '../models';

// thêm
const create = async (data) => {
  try {
    if (!data.name) {
      return {
        errCode: 1,
        message: 'Thiếu tên kho'
      };
    }

    // Kiểm tra tên kho đã tồn tại chưa
    const existed = await db.Kho.findOne({
      where: { name: data.name }
    });

    if (existed) {
      return {
        errCode: 2,
        message: 'Tên kho đã tồn tại'
      };
    }

    const newKho = await db.Kho.create({
      name: data.name
    });

    return {
      errCode: 0,
      message: 'Tạo kho thành công',
      data: newKho
    };

  } catch (error) {
    console.error(error);
    return {
      errCode: -1,
      message: 'Lỗi server'
    };
  }
};

// get all
const getAll = async () => {
  try {
    const list = await db.Kho.findAll({
      order: [['createdAt', 'DESC']]
    });

    return {
      errCode: 0,
      message: 'Lấy danh sách kho thành công',
      data: list
    };

  } catch (error) {
    console.error(error);
    return {
      errCode: -1,
      message: 'Lỗi server'
    };
  }
};

// delete
const deleteKho = async (id) => {
  try {
    if (!id) {
      return {
        errCode: 1,
        message: 'Thiếu id kho cần xóa'
      };
    }

    const kho = await db.Kho.findOne({ where: { id } });

    if (!kho) {
      return {
        errCode: 2,
        message: 'Không tìm thấy kho'
      };
    }

    await db.Kho.destroy({ where: { id } });

    return {
      errCode: 0,
      message: 'Xóa kho thành công'
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
    create : create,
    getAll: getAll,
    deleteKho: deleteKho
}