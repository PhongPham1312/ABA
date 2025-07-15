import asService from '../services/tmService';

const createTM = async (req, res) => {
    const result = await asService.createTM(req.body);
    return res.status(200).json(result);
};

const getTMByMonthGrouped = async (req, res) => {
    const result = await asService.getTMByMonthGrouped(req.query.thang);
    return res.status(200).json(result);
};

const deleteTM = async (req, res) => {
    const result = await asService.deleteTM(req.query.id);
    return res.status(200).json(result);
};

module.exports = {
    createTM :createTM,
    getTMByMonthGrouped: getTMByMonthGrouped,
    deleteTM: deleteTM
}

