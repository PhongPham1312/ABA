import db from '../models';
import { Op } from 'sequelize';

// Chuyển "T2 _ 14.7.2025" → 20250714
const convertDayToNumber = (dayStr) => {
    try {
        const [_, datePart] = dayStr.split('_');
        const [d, m, y] = datePart.trim().split('.').map(Number);
        if (!d || !m || !y) return null;
        return y * 10000 + m * 100 + d;
    } catch (error) {
        return null;
    }
};

// Trả về số ngày dạng int từ mảng lịch
const extractNgayList = (data) => {
    return data
        .map(item => convertDayToNumber(item.day))
        .filter(ngay => ngay !== null);
};

const createOrReplaceLichByWeek = async (data) => {
    try {
        if (!Array.isArray(data) || data.length === 0) {
            return {
                errCode: 1,
                message: 'Không có dữ liệu để lưu!'
            };
        }

        const userId = data[0].userId;
        if (!userId) {
            return {
                errCode: 2,
                message: 'Thiếu userId!'
            };
        }

        // Tách ngày dưới dạng số nguyên từ dữ liệu
        const ngayList = extractNgayList(data);

        // Xóa lịch cũ của user trong các ngày trong tuần
        await db.Lich.destroy({
            where: {
                userid: userId,
                ngay: {
                    [Op.in]: ngayList
                }
            }
        });

        // Tạo mới danh sách lịch
        const lichToCreate = data.map(item => ({
            userid: item.userId,
            ngay: convertDayToNumber(item.day),
            ca: item.ca
        }));

        await db.Lich.bulkCreate(lichToCreate);

        return {
            errCode: 0,
            message: 'Lưu lịch thành công!'
        };
    } catch (e) {
        console.log('Error at createOrReplaceLichByWeek:', e);
        return {
            errCode: -1,
            message: 'Lỗi server!'
        };
    }
};

module.exports = {
    createOrReplaceLichByWeek : createOrReplaceLichByWeek
}