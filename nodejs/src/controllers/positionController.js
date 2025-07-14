import positionService from "../services/postionService";

// get all position
const getAllPosition = async (req, res) => {
    try {
        const result = await positionService.getAllPosition();
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
    getAllPosition : getAllPosition
};