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
    const existed = await db.Thuchithang.findOne({
      where: { name: data.name }
    });

    if (existed) {
      return {
        errCode: 2,
        message: 'Tên đã tồn tại'
      };
    }

    const newKho = await db.Thuchithang.create({
      name: data.name,
      parent: data.parent
    });

    return {
      errCode: 0,
      message: 'Tạo thành công',
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
    const list = await db.Thuchithang.findAll({
      order: [['createdAt', 'DESC']]
    });

    return {
      errCode: 0,
      message: 'Lấy danh sách thành công',
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
const deletethuchi = async (id) => {
  try {
    if (!id) {
      return {
        errCode: 1,
        message: 'Thiếu id cần xóa'
      };
    }

    const kho = await db.Thuchithang.findOne({ where: { id } });

    if (!kho) {
      return {
        errCode: 2,
        message: 'Không tìm thấy'
      };
    }

    await db.Thuchithang.destroy({ where: { id } });

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

// get by parent
const getThuchithangByParent = async (parent) => {
  try {
    if (!parent) {
      return {
        errCode: 1,
        message: 'Thiếu parent'
      };
    }

    const list = await db.Thuchithang.findAll({
      where: { parent },
      order: [['createdAt', 'DESC']]
    });

    return {
      errCode: 0,
      message: 'Lấy danh sách theo parent thành công',
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


module.exports = {
    create : create,
    getAll: getAll,
    deletethuchi: deletethuchi,
    getThuchithangByParent: getThuchithangByParent
}