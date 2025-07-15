import tmService from '../services/tmService';

const handleCreateTM = async (req, res) => {
    const result = await tmService.createTM(req.body);
    return res.status(200).json(result);
};


module.exports = {
    handleCreateTM :handleCreateTM
}

