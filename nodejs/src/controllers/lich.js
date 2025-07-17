import Lich from '../services/lich'
const handleCreateLich = async (req, res) => {
    const result = await Lich.createOrReplaceLichByWeek(req.body);
    return res.status(200).json(result);
};

module.exports = {
    handleCreateLich: handleCreateLich
}