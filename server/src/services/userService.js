import db from '../models';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

// Hàm hash mật khẩu
const hashPasswordFunc = (password) => {
    return new Promise((resolve, reject) => {
        try {
            const hash = bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (e) {
            reject(e);
        }
    });
};

// Hàm tạo người dùng mới
const createUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra trường bắt buộc
            if (!data.name || !data.phone || !data.password) {
                return resolve({
                    err: 1,
                    msg: 'Thiếu trường bắt buộc: name, phone hoặc password!'
                });
            }

            // Kiểm tra trùng số điện thoại
            const existingUser = await db.User.findOne({ where: { phone: data.phone } });
            if (existingUser) {
                return resolve({
                    err: 2,
                    msg: 'Số điện thoại đã tồn tại!'
                });
            }

            // Hash password
            const hashedPassword = await hashPasswordFunc(data.password);

            // Tạo người dùng
            await db.User.create({
                name: data.name,
                phone: data.phone,
                password: hashedPassword,
                zalo: data.zalo || null,
                image_t: data.image_t || null,
                image_s: data.image_s || null
            });

            resolve({
                err: 0,
                msg: 'Tạo người dùng thành công!'
            });
        } catch (e) {
            reject({
                err: 3,
                msg: 'Lỗi server khi tạo người dùng!',
                error: e.message
            });
        }
    });
};

// get user by id
const getUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id },
                attributes: { exclude: ['password'] } // ẩn password
            });

            if (!user) {
                return resolve({
                    err: 1,
                    msg: 'Không tìm thấy người dùng!'
                });
            }

            resolve({
                err: 0,
                msg: 'Lấy người dùng thành công!',
                data: user
            });
        } catch (e) {
            reject({
                err: 2,
                msg: 'Lỗi server khi lấy người dùng!',
                error: e.message
            });
        }
    });
};

// get all user
const getAllUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const users = await db.User.findAll({
                attributes: { exclude: ['password'] } // ẩn mật khẩu
            });

            resolve({
                err: 0,
                msg: 'Lấy danh sách người dùng thành công!',
                data: users
            });
        } catch (e) {
            reject({
                err: 1,
                msg: 'Lỗi khi truy vấn người dùng!',
                error: e.message
            });
        }
    });
};

// update user
const updateUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                return resolve({
                    err: 1,
                    msg: 'Thiếu id người dùng để cập nhật!'
                });
            }

            const user = await db.User.findOne({ where: { id: data.id } });

            if (!user) {
                return resolve({
                    err: 2,
                    msg: 'Người dùng không tồn tại!'
                });
            }

            // Cập nhật thông tin (chỉ các trường cho phép)
            await db.User.update(
                {
                    name: data.name || user.name,
                    phone: data.phone || user.phone,
                    zalo: data.zalo || user.zalo,
                    image_t: data.image_t || user.image_t,
                    image_s: data.image_s || user.image_s
                },
                {
                    where: { id: data.id }
                }
            );

            resolve({
                err: 0,
                msg: 'Cập nhật người dùng thành công!'
            });
        } catch (e) {
            reject({
                err: 3,
                msg: 'Lỗi khi cập nhật người dùng!',
                error: e.message
            });
        }
    });
};

// delete user
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                return resolve({
                    err: 1,
                    msg: 'Thiếu id người dùng để xóa!'
                });
            }

            const user = await db.User.findOne({ where: { id } });

            if (!user) {
                return resolve({
                    err: 2,
                    msg: 'Người dùng không tồn tại!'
                });
            }

            await db.User.destroy({ where: { id } });

            resolve({
                err: 0,
                msg: 'Xóa người dùng thành công!'
            });
        } catch (e) {
            reject({
                err: 3,
                msg: 'Lỗi khi xóa người dùng!',
                error: e.message
            });
        }
    });
};

// search user
const searchUsers = ({ phone, name, zalo }) => {
    return new Promise(async (resolve, reject) => {
        try {
            let whereCondition = {};

            if (phone) whereCondition.phone = { [Op.like]: `%${phone}%` };
            if (name)  whereCondition.name  = { [Op.like]: `%${name}%` };
            if (zalo)  whereCondition.zalo  = { [Op.like]: `%${zalo}%` };

            const users = await db.User.findAll({
                where: whereCondition,
                attributes: { exclude: ['password'] }
            });

            resolve({
                err: 0,
                msg: 'Tìm kiếm thành công!',
                data: users
            });
        } catch (e) {
            reject({
                err: 2,
                msg: 'Lỗi khi tìm kiếm người dùng!',
                error: e.message
            });
        }
    });
};

// update password
const updatePassword = ({ id, currentPassword, newPassword }) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !currentPassword || !newPassword) {
                return resolve({
                    err: 1,
                    msg: 'Thiếu thông tin: id, currentPassword hoặc newPassword!'
                });
            }

            const user = await db.User.findOne({ where: { id } });

            if (!user) {
                return resolve({
                    err: 2,
                    msg: 'Không tìm thấy người dùng!'
                });
            }

            const isMatch = bcrypt.compareSync(currentPassword, user.password);

            if (!isMatch) {
                return resolve({
                    err: 3,
                    msg: 'Mật khẩu hiện tại không đúng!'
                });
            }

            const hashed = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));

            await db.User.update({ password: hashed }, { where: { id } });

            resolve({
                err: 0,
                msg: 'Cập nhật mật khẩu thành công!'
            });
        } catch (e) {
            reject({
                err: 4,
                msg: 'Lỗi khi cập nhật mật khẩu!',
                error: e.message
            });
        }
    });
};


module.exports = {
    createUser: createUser,
    getUserById: getUserById,
    getAllUsers: getAllUsers,
    updateUser: updateUser,
    deleteUser: deleteUser,
    searchUsers: searchUsers,
    updatePassword: updatePassword
}