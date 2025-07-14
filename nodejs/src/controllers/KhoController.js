import khoService from '../services/khoService';

// thêm mới
const createKho = async (req, res) => {
  const data = req.body;
  const result = await khoService.create(data);
  return res.status(200).json(result);
};

// get all
const getAll = async (req, res) => {
  const result = await khoService.getAll();
  return res.status(200).json(result);
};

// delete
const deleteKho = async (req, res) => {
  const result = await khoService.deleteKho(req.body.id);
  return res.status(200).json(result);
};

module.exports = {
    createKho : createKho,
    getAll: getAll,
    deleteKho: deleteKho
};