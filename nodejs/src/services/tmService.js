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

        // Tạo bản ghi mới
        await db.Tienmat.create({
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

const getTienmatkByMonthGrouped = async (month) => {
  try {
    if (!month) {
      return {
        errCode: 1,
        message: 'Thiếu tháng cần lọc'
      };
    }

    const allData = await db.Tienmat.findAll({
      order: [['ngay', 'DESC']],
      raw: true
    });

    const filteredGrouped = {};

    allData.forEach(item => {
      const ngay = item.ngay;

      if (ngay && typeof ngay === 'string') {
        const parts = ngay.split('.');
        if (parts.length === 3) {
          const day = parts[0];
          const itemMonth = parts[1]; // tháng trong dữ liệu
          
          if (String(itemMonth) === String(month)) {
            if (!filteredGrouped[day]) {
              filteredGrouped[day] = [];
            }
            filteredGrouped[day].push(item);
          }
        }
      }
    });

    return {
      errCode: 0,
      message: 'Lấy dữ liệu thành công',
      data: filteredGrouped
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


const getGroupByDateService = async () => {
    try {
        const allRecords = await db.Tienmat.findAll({
            raw: true,
            attributes: ['content', 'money', 'ngay', 'createdAt'],
        });

        const grouped = {};

        allRecords.forEach(item => {
            if (!item.ngay) return;

            const [day, month, year] = item.ngay.split('.');

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
    createTM: createTM,
    getTienmatkByMonthGrouped: getTienmatkByMonthGrouped,
    deleteTM : deleteTM,
    getGroupByDateService: getGroupByDateService
}
