import userService from '../services/userService.js'

// create 
let createUser = async (req, res) => {
    const { name, phone, password } = req.body;
    if (!name || !phone || !password)
        return res.status(400).json({ err: 1, msg: 'Thiếu name, phone hoặc password!' });

    try {
        const response = await userService.createUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ err: 2, msg: 'Lỗi server!', error: e.message });
    }
};

// get user
let getUser = async (req, res) => {
    const id = req.params.id;
    if (!id)
        return res.status(400).json({ err: 1, msg: 'Thiếu id người dùng!' });

    try {
        const response = await userService.getUserById(id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ err: 2, msg: 'Lỗi server!', error: e.message });
    }
};

// get all user
let getAllUsers = async (req, res) => {
    try {
        const response = await userService.getAllUsers();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ err: 2, msg: 'Lỗi server!', error: e.message });
    }
};

// update user
let updateUser = async (req, res) => {
    const { id } = req.body;

    if (!id)
        return res.status(400).json({ err: 1, msg: 'Thiếu id người dùng để cập nhật!' });

    try {
        const response = await userService.updateUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ err: 2, msg: 'Lỗi server khi cập nhật!', error: e.message });
    }
};

// delete user
let deleteUser = async (req, res) => {
    const { id } = req.body;

    if (!id)
        return res.status(400).json({ err: 1, msg: 'Thiếu id người dùng để xóa!' });

    try {
        const response = await userService.deleteUser(id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ err: 2, msg: 'Lỗi server khi xóa người dùng!', error: e.message });
    }
};

// serch user
let searchUsers = async (req, res) => {
    try {
        const { phone, name, zalo } = req.query;

        if (!phone && !name && !zalo) {
            return res.status(400).json({
                err: 1,
                msg: 'Vui lòng cung cấp ít nhất 1 trường: phone, name hoặc zalo để tìm kiếm!'
            });
        }

        const response = await userService.searchUsers({ phone, name, zalo });
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            err: 2,
            msg: 'Lỗi server khi tìm kiếm người dùng!',
            error: e.message
        });
    }
};

// update password
let updatePassword = async (req, res) => {
    const { id, currentPassword, newPassword } = req.body;

    if (!id || !currentPassword || !newPassword)
        return res.status(400).json({ err: 1, msg: 'Thiếu id, mật khẩu hiện tại hoặc mật khẩu mới!' });

    try {
        const response = await userService.updatePassword(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            err: 4,
            msg: 'Lỗi server khi cập nhật mật khẩu!',
            error: e.message
        });
    }
};

module.exports = {
    createUser: createUser,
    getUser:getUser,
    getAllUsers: getAllUsers,
    updateUser: updateUser,
    deleteUser: deleteUser,
    searchUsers: searchUsers,
    updatePassword: updatePassword
}