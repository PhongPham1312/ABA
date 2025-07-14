import db from '../models';

const createPhone = async (data) => {
  try {
    // Kiểm tra bắt buộc
    if (!data.name || !data.somay || !data.seri) {
      return {
        errCode: 1,
        message: 'Thiếu thông tin bắt buộc: tên , số máy và số sê ri'
      };
    }

    // Thêm mới
    const newPhone = await db.Phone.create({
      name: data.name,
      somay: data.somay,
      seri: data.seri,
      gia: data.gia,
      mau: data.mau || null,
      vo: data.vo || null,
      dungluong: data.dungluong || null,
      ram: data.ram || null,
      pin: data.pin || null,
      face: data.face || null,
      touch: data.touch || null,
      icloud: data.icloud || null,
      main: data.main || null,
      man: data.man || null,
      phonemonth: data.phonemonth || null,
      status: true
    });

    return {
      errCode: 0,
      message: 'Tạo điện thoại thành công',
      data: newPhone
    };
  } catch (error) {
    console.error(error);
    return {
      errCode: -1,
      message: 'Lỗi server'
    };
  }
};

const getAllPhones = async () => {
  try {
    const phones = await db.Phone.findAll({
      order: [['id', 'DESC']]
    });

    return {
      errCode: 0,
      message: 'Lấy danh sách thành công',
      data: phones
    };
  } catch (error) {
    console.error(error);
    return {
      errCode: -1,
      message: 'Lỗi server'
    };
  }
};

module.exports = {
  createPhone: createPhone,
  getAllPhones : getAllPhones
};
