import tm from '../services/tmService';

const createTM = async (req, res) => {
    const result = await tm.createTM(req.body);
    return res.status(200).json(result);
};

const getTienmatkByMonthGrouped = async (req, res) => {
    const result = await tm.getTienmatkByMonthGrouped(req.query.thang);
    return res.status(200).json(result);
};

const deleteTM = async (req, res) => {
    const result = await tm.deleteTM(req.query.id);
    return res.status(200).json(result);
};

const getGroupByDateService = async (req, res) => {
    const result = await tm.getGroupByDateService();
    return res.status(200).json(result);
};

module.exports = {
    createTM :createTM,
    getTienmatkByMonthGrouped: getTienmatkByMonthGrouped,
    deleteTM: deleteTM,
    getGroupByDateService: getGroupByDateService
}

