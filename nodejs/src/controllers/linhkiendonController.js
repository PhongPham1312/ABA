// controllers/linhkienController.js

import * as linhkienService from '../services/linhkiendonService';

const create = async (req, res) => {
  const response = await linhkienService.createLinhKienDon(req.body);
  return res.status(200).json(response);
};

const getAll = async (req, res) => {
  const response = await linhkienService.getAllLinhKienDon();
  return res.status(200).json(response);
};

const getLinhkienByDonmay = async (req, res) => {
  const donmayId = req.query.donmay;
  const response = await linhkienService.getAllLinhkienByDonmay(donmayId);
  return res.status(200).json(response);
};

const deleteLinhkiendon = async (req, res) => {
    const id = req.query.id;
    console.log(id)
    if (!id) {
        return res.status(400).json({
            errCode: 1,
            errMessage: 'Thiếu ID để xóa!'
        });
    }

    const result = await linhkienService.deleteLinhkiendon(id);
    return res.status(200).json(result);
};

module.exports = {
  create: create,
getAll: getAll,
getLinhkienByDonmay: getLinhkienByDonmay,
deleteLinhkiendon: deleteLinhkiendon
}
