import Lich from '../services/lich'
const createOrUpdateLich = async (req, res) => {
    try {
        const data = req.body;
        const result = await Lich.createOrUpdateLich(data);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Server error'
        });
    }
};

const getLichByUserAndRange = async (req, res) => {
    try {
        const {userId, startDate, endDate} = req.query;
        const result = await Lich.getLichByUserAndRange(userId, startDate, endDate);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Server error'
        });
    }
};

const handleGetLichByUser = async (req, res) => {
  const userId = req.query.userId;
  const result = await Lich.getLichByUser(userId);
  return res.status(200).json(result);
}

const updateTrangThaiLich = async (req, res) => {
  let {userid, ngay} = req.query
  const result = await Lich.updateTrangThaiLich(userid, ngay);
  return res.status(200).json(result);
}

module.exports = {
    createOrUpdateLich: createOrUpdateLich,
    getLichByUserAndRange: getLichByUserAndRange,
    handleGetLichByUser:handleGetLichByUser,
    updateTrangThaiLich: updateTrangThaiLich
}