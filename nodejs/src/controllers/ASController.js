import asService from '../services/ASService';

const handleCreateAS = async (req, res) => {
    const result = await asService.createAS(req.body);
    return res.status(200).json(result);
};

const getSacombankByMonthGrouped = async (req, res) => {
    const result = await asService.getSacombankByMonthGrouped(req.query.thang);
    return res.status(200).json(result);
};

const deleteAS = async (req, res) => {
    const result = await asService.deleteAS(req.query.id);
    return res.status(200).json(result);
};

const getGroupByNgay = async (req, res) => {
    const result = await asService.getGroupByDateService();
    return res.status(200).json(result);
};

module.exports = {
    handleCreateAS :handleCreateAS,
    getSacombankByMonthGrouped: getSacombankByMonthGrouped,
    deleteAS: deleteAS,
    getGroupByNgay: getGroupByNgay
}

