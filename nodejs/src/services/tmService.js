import { DATE } from 'sequelize';
import db from '../models';

const createTM = async (data) => {
    try {
        const { content, money, ngay, type , link} = data;

        // Kiểm tra dữ liệu đầu vào
        if (!content || !money || !ngay ) {
            return {
                errCode: 1,
                errMessage: 'Thiếu thông tin bắt buộc!'
            };
        }

        // Tạo bảtiên ghi mới
        await db.Tienmat.create({
            content,
            money,
            ngay,
            type,
            link
        });

        return {
            errCode: 0,
            message: 'Tạo bản ghi TM thành công!'
        };

    } catch (e) {
        console.error('Lỗi tạo bản ghi TM:', e);
        return {
            errCode: -1,
            errMessage: 'Lỗi phía server!'
        };
    }
};

const getTMByMonthGrouped = async (month) => {
  try {
    if (!month) {
      return {
        errCode: 1,
        message: 'Thiếu tháng cần lọc'
      };
    }

    // Lấy toàn bộ bản ghi
    const allData = await db.Tienmat.findAll({
      order: [['ngay', 'DESC']]
    });

    // Lọc theo tháng và nhóm lại theo ngày
    const filteredGrouped = {};

    allData.forEach(item => {
      if (item.ngay && typeof item.ngay === 'string') {
        const parts = item.ngay.split('.');
        if (parts.length === 2 && parts[1] === String(month)) {
          const day = parts[0];
          if (!filteredGrouped[day]) {
            filteredGrouped[day] = [];
          }
          filteredGrouped[day].push(item);
        }
      }
    });

    return {
      errCode: 0,
      message: 'Lấy dữ liệu thành công',
      data: filteredGrouped  // object group theo ngày
    };

  } catch (error) {
    console.error(error);
    return {
      errCode: -1,
      message: 'Lỗi server'
    };
  }
};

const deleteTM = async (id) => {
  try {
    if (!id) {
      return {
        errCode: 1,
        message: 'Thiếu ID để xóa'
      };
    }

    // Tìm bản ghi
    const record = await db.Tienmat.findOne({ where: { id } });

    if (!record) {
      return {
        errCode: 2,
        message: 'Không tìm thấy bản ghi'
      };
    }

    // Xóa bản ghi
    await db.Tienmat.destroy({ where: { id } });

    return {
      errCode: 0,
      message: 'Xóa thành công'
    };

  } catch (error) {
    console.error('Lỗi khi xóa bản ghi AS:', error);
    return {
      errCode: -1,
      message: 'Lỗi phía server'
    };
  }
};


module.exports = {
    createTM: createTM,
    getTMByMonthGrouped: getTMByMonthGrouped,
    deleteTM:deleteTM,
}
