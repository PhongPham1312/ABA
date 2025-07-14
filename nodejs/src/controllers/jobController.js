import jobService from "../services/jobService";

// get all Job
const getAllJob = async (req, res) => {
    try {
        const result = await jobService.getAllJob();
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Lỗi server'
        });
    }
};

module.exports = {
    getAllJob : getAllJob
};