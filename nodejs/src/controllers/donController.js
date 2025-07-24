// controllers/donController.js
import * as donService from '../services/donService';

export const createDon = async (req, res) => {
  const result = await donService.createDon(req.body);
  return res.status(200).json(result);
};

export const getAllDon = async (req, res) => {
  const result = await donService.getAllDon();
  return res.status(200).json(result);
};

export const getGroupByDateService = async (req, res) => {
  const result = await donService.getGroupByDateService();
  return res.status(200).json(result);
};


module.exports = {
    createDon : createDon,
    getAllDon : getAllDon,
    getGroupByDateService: getGroupByDateService
}