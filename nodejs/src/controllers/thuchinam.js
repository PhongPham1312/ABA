import thuchinam from '../services/thuchinam';

// thêm mới
const createthuchi = async (req, res) => {
  const data = req.body;
  const result = await thuchinam.create(data);
  return res.status(200).json(result);
};

// get all
const getAll = async (req, res) => {
  const result = await thuchinam.getAll();
  return res.status(200).json(result);
};

// delete
const deletethuchi = async (req, res) => {
  const result = await thuchinam.deletethuchi(req.query.id);
  return res.status(200).json(result);
};

module.exports = {
    createthuchi : createthuchi,
    getAll: getAll,
    deletethuchi: deletethuchi
};