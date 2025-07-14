import khomonthService from '../services/khomonthService';

// Controller thêm
const createKhomonth = async (req, res) => {
  const data = req.body;
  const result = await khomonthService.createKhomonth(data);
  return res.status(200).json(result);
};

// Controller xóa
const deleteKhomonth = async (req, res) => {
  const id = req.body.id; // hoặc req.params.id nếu dùng param
  const result = await khomonthService.deleteKhomonth(id);
  return res.status(200).json(result);
};

// get all
const getAllKhomonth = async (req, res) => {
  const result = await khomonthService.getAllKhomonth();
  return res.status(200).json(result);
};

module.exports = {
    createKhomonth: createKhomonth,
    deleteKhomonth: deleteKhomonth,
    getAllKhomonth: getAllKhomonth
}