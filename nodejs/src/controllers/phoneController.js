import phoneService from '../services/phoneService';

const createPhone = async (req, res) => {
  const result = await phoneService.createPhone(req.body);
  return res.status(200).json(result);
};

const getAllPhones = async (req, res) => {
  const result = await phoneService.getAllPhones();
  return res.status(200).json(result);
};

module.exports = {
  createPhone: createPhone,
  getAllPhones : getAllPhones
};
