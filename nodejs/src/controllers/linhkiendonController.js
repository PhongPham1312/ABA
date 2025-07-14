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

module.exports = {
  create: create,
getAll: getAll,
getLinhkienByDonmay: getLinhkienByDonmay
}
