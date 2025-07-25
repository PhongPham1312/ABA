import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}

// get position
const getAllPosition = () =>{
    return axios.get('api/get-all-position')
}

// get position
const getAllMay = () =>{
    return axios.get('api/get-all-by-ngay')
}

// get position
const getAllLoaiMay = () =>{
    return axios.get('api/get-all-may')
}


// get position
const getAllCustomer = () =>{
    return axios.get('api/get-all-customer')
}

// get job
const getAllJob = () =>{
    return axios.get('api/get-all-job')
}

const getAllMark = () =>{
    return axios.get('api/get-all-mark')
}



// create
const createUser = (data) => {
    return axios.post(`/api/create-user`, data);
}

const createDon = (data) => {
    return axios.post(`/api/create-don`, data);
}

const createMay = (data) => {
    return axios.post(`/api/create-gia`, data);
}



const createTM = (data) => {
    return axios.post(`/api/create-tm`, data);
}

const addMark = (data) => {
    return axios.post(`/api/create-mark`, data);
}

const createCustomer = (data) => {
    return axios.post(`/api/create-customer`, data);
}
const createlinhkiendon = (data) => {
    return axios.post(`/api/create-linhkiendon`, data);
}

// get all
const getAllUser = () =>{
    return axios.get('api/get-all-user')
}

const searchUser = (keyword) =>{
    return axios.get('api/get-all-user-key', {
        params: { keyword: keyword } // ⛔ Đây chỉ đúng với GET request
    })
}

const deleteUser = (userId) =>{
    return axios.delete('api/delete-user', {
        data: { id: userId }
    })
}

// get all
const getAlllinhkiendon = () =>{
    return axios.get('api/get-all-linhkiendon')
}

const getLinhkienByDonmay = (donId) => {
    return axios.get('/api/get-all-linhkiendon-by-donmay', {
        params: { donmay: donId }
    });
};

const getSacombankByMonthGrouped = (donId) => {
    return axios.get('/api/get-all-by-thang', {
        params: { thang: donId }
    });
};

const getTMByMonthGrouped = (donId) => {
    return axios.get('/api/get-all-tm-by-thang', {
        params: { thang: donId }
    });
};

const deleteLinhkiendon = (donId) => {
    return axios.delete('/api/delete-linhkiendon', {
        params: { id: donId } // ⛔ Đây chỉ đúng với GET request
    });
};

const deleteAS = (donId) => {
    return axios.delete('/api/delete-as', {
        params: { id: donId } // ⛔ Đây chỉ đúng với GET request
    });
};

const deleteTM = (donId) => {
    return axios.delete('/api/delete-tm', {
        params: { id: donId } // ⛔ Đây chỉ đúng với GET request
    });
};

export { handleLoginApi, getAllPosition , 
    createUser , getAllUser , deleteUser, 
    getAllJob ,getAllCustomer ,getAllMay,getAllLoaiMay,
    createMay ,createCustomer, createDon, getAllMark, addMark,
    createlinhkiendon, getAlllinhkiendon, getLinhkienByDonmay,
    deleteLinhkiendon, createTM, getTMByMonthGrouped ,
    getSacombankByMonthGrouped , deleteAS ,deleteTM, searchUser
};