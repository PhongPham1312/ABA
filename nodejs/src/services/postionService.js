import db from '../models';

// get all position
const getAllPosition = async () => {
    try {
        const positions = await db.Position.findAll({
            attributes: ['id', 'name'], // chọn các trường cần thiết
            order: [['id', 'ASC']]
        });

        return {
            errCode: 0,
            message: 'Lấy danh sách vị trí thành công',
            data: positions
        };
    } catch (error) {
        console.error(error);
        return {
            errCode: 1,
            message: 'Lỗi khi lấy danh sách vị trí',
            data: []
        };
    }
};

module.exports =  {
    getAllPosition : getAllPosition
};