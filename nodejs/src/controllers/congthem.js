// controllers/congthemController.js
import {
    createCongthem,
    getCongthemByUserAndNgay,
    updateTrangThaiLichVaCongThem
} from '../services/congthem';

const handleCreateCongthem = async (req, res) => {
    const result = await createCongthem(req.body);
    return res.status(200).json(result);
};

const handleGetCongthemByUserAndNgay = async (req, res) => {
    const result = await getCongthemByUserAndNgay(req.query.userid);
    return res.status(200).json(result);
};


const handleupdateTrangThaiLichVaCongThem = async (req, res) => {
        const { userid, ngay } = req.body;
    const result = await updateTrangThaiLichVaCongThem(userid, ngay);
    return res.status(200).json(result);
};


module.exports = {
    handleCreateCongthem: handleCreateCongthem,
    handleGetCongthemByUserAndNgay : handleGetCongthemByUserAndNgay,
    handleupdateTrangThaiLichVaCongThem: handleupdateTrangThaiLichVaCongThem,
    
}