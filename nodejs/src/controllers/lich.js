import Lich from '../services/lich'
const handleCreateLich = async (req, res) => {
    const result = await Lich.saveLichUserService(req.body);
    return res.status(200).json(result);
};

const getLichTuanHienTai = async (req, res) => {
  try {
    const userid = req.query.userid;
    if (!userid) {
      return res.status(400).json({
        errCode: 1,
        message: 'Thiếu userid'
      });
    }

    const result = await Lich.getLichTuanHienTaiService(userid);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      message: 'Lỗi server'
    });
  }
};

module.exports = {
    handleCreateLich: handleCreateLich,
    getLichTuanHienTai: getLichTuanHienTai
}