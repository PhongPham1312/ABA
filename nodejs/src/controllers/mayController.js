import giaService from '../services/mayService';

const addGia = async (req, res) => {
  const result = await giaService.createGia(req.body);
  return res.status(200).json(result);
};

const getMayList = async (req, res) => {
  const result = await giaService.getAllMay();
  return res.status(200).json(result);
};


module.exports = {
    addGia : addGia,
    getMayList: getMayList
}