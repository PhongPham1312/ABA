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
  let {userid, ngay} = req.body
  const result = await Lich.updateTrangThaiLich(userid, ngay);
  return res.status(200).json(result);
}

// controller
const xacNhanKetThucTuan = async (req, res) => {
    try {
        const { userid, dsngay } = req.body;
        if (!userid || !Array.isArray(dsngay) || dsngay.length === 0) {
            return res.status(400).json({
                errCode: 1,
                errMessage: 'Thiếu userid hoặc danh sách ngày'
            });
        }

        const result = await Lich.capNhatEndTuan(userid, dsngay);

        return res.status(200).json(result);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: 'Lỗi server'
        });
    }
};


module.exports = {
    createOrUpdateLich: createOrUpdateLich,
    getLichByUserAndRange: getLichByUserAndRange,
    handleGetLichByUser:handleGetLichByUser,
    updateTrangThaiLich: updateTrangThaiLich,
    xacNhanKetThucTuan :xacNhanKetThucTuan
}