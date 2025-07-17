import db from '../models';
import { Op } from 'sequelize';
const getWeekRange = (date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMonday);

  const weekDays = [];
  const thuNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  for (let i = 0; i < 7; i++) {
    const curr = new Date(monday);
    curr.setDate(monday.getDate() + i);
    const day = curr.getDate();
    const month = curr.getMonth() + 1;
    const year = curr.getFullYear();
    const thu = thuNames[curr.getDay()];
    weekDays.push(`${thu} _ ${day}.${month}.${year}`);
  }

  return weekDays;
};

const saveLichUserService = async (data) => {
  try {
    if (!data || data.length === 0) {
      return {
        errCode: 1,
        message: 'Không có dữ liệu lịch làm để lưu'
      };
    }

    const userid = data[0].userid;

    // → lấy toàn bộ các tuần chứa các ngày gửi lên
    let allDaysToDelete = new Set();

    data.forEach(item => {
      const parts = item.day.split(' _ ')[1]; // lấy phần 15.7.2025
      const [day, month, year] = parts.split('.').map(Number);
      const jsDate = new Date(year, month - 1, day);
      const weekDays = getWeekRange(jsDate);
      weekDays.forEach(d => allDaysToDelete.add(d));
    });

    const daysArray = Array.from(allDaysToDelete);

    // → xoá lịch làm trong những ngày đó
    await db.Lich.destroy({
      where: {
        userid,
        day: {
          [Op.in]: daysArray
        }
      }
    });


    // → tạo lại
    await db.Lich.bulkCreate(data);

    return {
      errCode: 0,
      message: 'Cập nhật lịch làm thành công!'
    };
  } catch (error) {
    console.error('saveLichUserService error:', error);
    return {
      errCode: -1,
      message: 'Lỗi server khi lưu lịch làm'
    };
  }
};


const getLichTuanHienTaiService = async (userid) => {
    console.log(userid)

  try {
    if (!userid) {
      return {
        errCode: 1,
        message: 'Thiếu userid'
      };
    }

    const today = new Date();
    const weekDays = getWeekRange(today);

    const data = await db.Lich.findAll({
      where: {
        userid,
        day: {
          [Op.in]: weekDays
        }
      },
      order: [['day', 'ASC'], ['ca', 'ASC']]
    });

    return {
      errCode: 0,
      data
    };
  } catch (error) {
    console.error('getLichTuanHienTaiService error:', error);
    return {
      errCode: -1,
      message: 'Lỗi server khi lấy lịch tuần hiện tại'
    };
  }
};

module.exports = {
    saveLichUserService : saveLichUserService,
    getLichTuanHienTaiService: getLichTuanHienTaiService
}