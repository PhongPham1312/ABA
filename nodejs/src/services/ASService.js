import { DATE } from 'sequelize';
import db from '../models';

const createAS = async (data) => {
    try {
        const { content, money, ngay, type , link} = data;

        // Kiểm tra dữ liệu đầu vào
        if (!content || !money || !ngay || !type  || !link) {
            return {
                errCode: 1,
                errMessage: 'Thiếu thông tin bắt buộc!'
            };
        }

        // Tạo bản ghi mới
        await db.Sacombank.create({
            content,
            money,
            ngay,
            type,
            link
        });

        return {
            errCode: 0,
            message: 'Tạo bản ghi AS thành công!'
        };

    } catch (e) {
        console.error('Lỗi tạo bản ghi AS:', e);
        return {
            errCode: -1,
            errMessage: 'Lỗi phía server!'
        };
    }
};

const getSacombankByMonthGrouped = async (month) => {
  try {
    if (!month) {
      return {
        errCode: 1,
        message: 'Thiếu tháng cần lọc'
      };
    }

    // Lấy toàn bộ bản ghi
    const allData = await db.Sacombank.findAll({
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


module.exports = {
    createAS: createAS,
    getSacombankByMonthGrouped: getSacombankByMonthGrouped
}
