import thuchithang from '../services/thuchithang';

// thêm mới
const createthuchi = async (req, res) => {
  const data = req.body;
  const result = await thuchithang.create(data);
  return res.status(200).json(result);
};

// get all
const getAll = async (req, res) => {
  const result = await thuchithang.getAll();
  return res.status(200).json(result);
};

// delete
const deletethuchi = async (req, res) => {
  const result = await thuchithang.deletethuchi(req.query.id);
  return res.status(200).json(result);
};

// get all
const getAllthuchithangbyparent = async (req, res) => {
  const result = await thuchithang.getThuchithangByParent(req.query.id);
  return res.status(200).json(result);
};


module.exports = {
    createthuchi : createthuchi,
    getAll: getAll,
    deletethuchi: deletethuchi,
    getAllthuchithangbyparent: getAllthuchithangbyparent
};