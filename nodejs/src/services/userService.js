import db from '../models/index';
import bcrypt from 'bcryptjs';


const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// create user
const createUserService = async (data) => {
    try {
        const { name, phone, password, zalo, image_t, image_s, role , job } = data;

        // Kiểm tra các trường bắt buộc
        if (!name || !phone || !password) {
            return {
                errCode: 1,
                errMessage: "Missing required fields: name, phone, or password"
            };
        }

        // Kiểm tra trùng số điện thoại
        const existingUser = await db.User.findOne({ where: { phone } });
        if (existingUser) {
            return {
                errCode: 2,
                errMessage: "Phone number already exists"
            };
        }

        const hashedPassword = await hashPassword(password);

        await db.User.create({
            name: name,
            phone: phone,
            password: hashedPassword,
            zalo: zalo || phone,
            image_t: image_t || null,
            image_s: image_s || null,
            role: role || null, // mặc định là 'user' nếu không truyền vào
            job: job || null, // mặc định là 'user' nếu không truyền vào
            status: true, 
        });

        return {
            errCode: 0,
            errMessage: "User created successfully"
        };

    } catch (error) {
        console.error(error);
        return {
            errCode: -1,
            errMessage: "Error from server"
        };
    }
};

// Kiểm tra user tồn tại theo số điện thoại
let checkUserPhone = (userPhone) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { phone: userPhone }
            });
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    });
};

// Hàm đăng nhập bằng phone và password
let handleUserLogin = (phone, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserPhone(phone);

            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['id', 'name', 'phone', 'role', 'password'],
                    where: { phone: phone , 
                        status: true // chỉ lấy user chưa bị ẩn
                    },
                    raw: true,
                });
                if (user) {
                    let check = await bcrypt.compare(password, user.password); // ✅ Sửa ở đây

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = 'User not found';
                }

            } else {
                userData.errCode = 1;
                userData.errMessage = `Phone number doesn't exist in our system`;
            }

            resolve(userData);
        } catch (e) {
            reject(e);
        }
    });
};


// get all user
const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            order: [['createdAt', 'DESC']],
            where: { status: true }, // chỉ lấy người dùng chưa bị ẩn
            attributes: { exclude: ['password', 'image_t', 'image_s'] }, // ❌ Không trả về password
            include: [
                {
                    model: db.Position,
                    as: 'positionUser',
                    attributes: ['id', 'name'] // lấy thêm cả id, name và money nếu cần
                },
                {
                    model: db.Job,
                    as: 'jobUser',
                    attributes: ['id', 'name', 'money'] // lấy thêm cả id, name và money nếu cần
                }
            ]
        });

        return {
            errCode: 0,
            message: 'Lấy danh sách người dùng thành công',
            data: users
        };
    } catch (e) {
        console.error(e);
        return {
            errCode: 1,
            message: 'Lỗi server khi lấy danh sách người dùng',
            data: []
        };
    }
};

//delete (ẩn)
const deleteUser = async (id) => {
    try {
        const user = await db.User.findOne({
            where: { id }
        });

        if (!user) {
            return {
                errCode: 1,
                message: 'Người dùng không tồn tại'
            };
        }

        await db.User.update(
            { status: false },
            { where: { id } }
        );

        return {
            errCode: 0,
            message: 'Đã xóa người dùng'
        };
    } catch (e) {
        return {
            errCode: -1,
            message: 'Lỗi server'
        };
    }
};


const createMark = async (data) => {
  try {
    if (!data.name || !data.phone) {
      return {
        errCode: 1,
        message: 'Thiếu tên hoặc số điện thoại'
      };
    }

    const existed = await db.Mark.findOne({
      where: { phone: data.phone }
    });

    if (existed) {
      return {
        errCode: 2,
        message: 'Số điện thoại đã tồn tại'
      };
    }

    const newMark = await db.Mark.create({
      name: data.name,
      phone: data.phone,
      zalo: data.zalo || '',
      role: data.role
    });

    return {
      errCode: 0,
      message: 'Tạo mới thành công',
      data: newMark
    };

  } catch (e) {
    console.error(e);
    return {
      errCode: -1,
      message: 'Lỗi server'
    };
  }
};


const getAllMark = async () => {
  try {
    const marks = await db.Mark.findAll({
      order: [['createdAt', 'DESC']]
    });

    return {
      errCode: 0,
      message: 'Lấy danh sách thành công',
      data :marks
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
    handleUserLogin: handleUserLogin,
    createUserService: createUserService,
    getAllUser: getAllUser,
    deleteUser: deleteUser, createMark,
    getAllMark
}