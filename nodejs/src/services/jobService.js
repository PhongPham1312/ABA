import db from '../models';

// get all Job
const getAllJob = async () => {
    try {
        const Jobs = await db.Job.findAll({
            attributes: ['id', 'name'], // chọn các trường cần thiết
            order: [['id', 'ASC']]
        });

        return {
            errCode: 0,
            message: 'Lấy danh sách chức vụ thành công',
            data: Jobs
        };
    } catch (error) {
        console.error(error);
        return {
            errCode: 1,
            message: 'Lỗi khi lấy danh sách chức vụ',
            data: []
        };
    }
};

module.exports =  {
    getAllJob : getAllJob
};