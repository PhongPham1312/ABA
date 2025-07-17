import db from '../models';

// Tạo khách hàng mới
export const createCustomer = async (data) => {
  try {
    if (!data.name || !data.phone) {
      return {
        errCode: 1,
        message: 'Thiếu tên hoặc số điện thoại'
      };
    }

    const existed = await db.Customer.findOne({
      where: { phone: data.phone }
    });

    if (existed) {
      return {
        errCode: 2,
        message: 'Khách hàng đã tồn tại'
      };
    }

    const newCustomer = await db.Customer.create({
      name: data.name,
      phone: data.phone,
      zalo: data.zalo || '',
      image_t: data.image_t || '',
      image_s: data.image_s || '',
      address: data.address || ''
    });

    return {
      errCode: 0,
      message: 'Tạo khách hàng thành công',
      customer: newCustomer
    };

  } catch (e) {
    console.error(e);
    return {
      errCode: -1,
      message: 'Lỗi server'
    };
  }
};

// Lấy tất cả khách hàng
export const getAllCustomers = async () => {
  try {
    const customers = await db.Customer.findAll({
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'name', 'phone'],     // CHỈ lấy các trường này
    });

    return {
      errCode: 0,
      message: 'Lấy danh sách khách hàng thành công',
      customers
    };
  } catch (e) {
    console.error(e);
    return {
      errCode: -1,
      message: 'Lỗi server'
    };
  }
};


module.exports = {
    createCustomer : createCustomer,
    getAllCustomers: getAllCustomers
}