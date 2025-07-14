import customerService  from '../services/customerService';

// Controller tạo khách hàng
export const addCustomer = async (req, res) => {
  const result = await customerService.createCustomer(req.body);
  return res.status(200).json(result);
};

// Controller lấy tất cả khách hàng
export const getAllCustomers = async (req, res) => {
  const result = await customerService.getAllCustomers();
  return res.status(200).json(result);
};

module.exports = {
    addCustomer  : addCustomer , 
    getAllCustomers : getAllCustomers
}