import db from '../models';

const createTM = async (data) => {
    try {
        const { content, money, ngay, type , link} = data;

        // Kiểm tra dữ liệu đầu vào
        if (!content || !money || !ngay || !type) {
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

module.exports = {
    createTM: createTM
}
