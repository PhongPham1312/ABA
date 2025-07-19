import db from '../models';
import { Op } from 'sequelize';
const createOrUpdateLich = async (data) => {
    try {
        for (let item of data) {
            const existing = await db.Lich.findOne({
                where: {
                    userid: item.userId,
                    ngay: item.ngay
                }
            });

            if (existing) {
                // update
                await db.Lich.update({
                    ca1: item.ca1,
                    ca2: item.ca2,
                    ca3: item.ca3,
                    ca4: item.ca4,
                }, {
                    where: { userid: item.userId, ngay: item.ngay }
                });
            } else {
                // create
                await db.Lich.create({
                    userid: item.userId,
                    ngay: item.ngay,
                    ca1: item.ca1,
                    ca2: item.ca2,
                    ca3: item.ca3,
                    ca4: item.ca4,
                });
            }
        }

        return {
            errCode: 0,
            message: 'OK'
        };

    } catch (error) {
        console.error(error);
        throw error;
    }
};

 const getLichByUserAndRange = async (userId, startDate, endDate) => {
  try {
    if (!userId || !startDate || !endDate) {
      return {
        errCode: 1,
        errMessage: 'Thiếu userId hoặc ngày bắt đầu/kết thúc'
      };
    }

    const data = await db.Lich.findAll({
      where: {
        userid: userId,
        ngay: {
          [Op.between]: [startDate, endDate]
        }
      },
      order: [['ngay', 'ASC']]
    });

    return {
      errCode: 0,
      data
    };

  } catch (e) {
    console.error(e);
    return {
      errCode: -1,
      errMessage: 'Lỗi server'
    };
  }
};

const getLichByUser = async (userId) => {
  try {
    if (!userId) {
      return {
        errCode: 1,
        errMessage: 'Missing userId'
      };
    }

    const lich = await db.Lich.findAll({
      where: { userid: userId },
      order: [['ngay', 'DESC']],
      raw: true,
    });

    return {
      errCode: 0,
      data: lich,
    };
  } catch (e) {
    console.log(e);
    return {
      errCode: -1,
      errMessage: 'Error from server'
    };
  }
};

module.exports = {
    createOrUpdateLich : createOrUpdateLich,
    getLichByUserAndRange: getLichByUserAndRange,
    getLichByUser: getLichByUser
}