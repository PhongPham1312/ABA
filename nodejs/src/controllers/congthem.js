// controllers/congthemController.js
import {
    createCongthem,
    getCongthemByUserAndNgay
} from '../services/congthem';

const handleCreateCongthem = async (req, res) => {
    const result = await createCongthem(req.body);
    return res.status(200).json(result);
};

const handleGetCongthemByUserAndNgay = async (req, res) => {
    const { userid, ngay } = req.query;
    const result = await getCongthemByUserAndNgay(userid, ngay);
    return res.status(200).json(result);
};


module.exports = {
    handleCreateCongthem: handleCreateCongthem,
    handleGetCongthemByUserAndNgay : handleGetCongthemByUserAndNgay
}