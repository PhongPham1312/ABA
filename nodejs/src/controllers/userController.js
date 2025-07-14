import userService from '../services/userService';

let handleLoging = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    //check email exist
    //password nhap vao ko dung
    //return userInfor
    // access_token :JWT json web token

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

// create
const createUser = async (req, res) => {
    try {
        const response = await userService.createUserService(req.body);
        return res.status(200).json(response);
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            errCode: -1,
            errMessage: "Internal server error"
        });
    }
};

// get all
const getAllUser = async (req, res) => {
    let result = await userService.getAllUser();
    return res.status(200).json(result);
};

// delete
const deleteUser = async (req, res) => {
    try {
        const data = await userService.deleteUser(req.body.id);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Lỗi server khi xoá người dùng'
        });
    }
};


const addMark = async (req, res) => {
  const result = await userService.createMark(req.body);
  return res.status(200).json(result);
};

const getAllMark = async (req, res) => {
  const result = await userService.getAllMark();
  return res.status(200).json(result);
};


module.exports = {
    handleLoging: handleLoging,
    createUser: createUser,
    getAllUser: getAllUser,
    deleteUser: deleteUser,
    getAllMark : getAllMark,
    addMark: addMark
}