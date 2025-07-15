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

const handleCreateAS = (data) => {
    return axios.post(`/api/create-as`, data);
}

const handleCreateTM = (data) => {
    return axios.post(`/api/create-tm`, data);
}

const addMark = (data) => {
    return axios.post(`/api/create-mark`, data);
}

const addCustomer = (data) => {
    return axios.post(`/api/create-customer`, data);
}
const createlinhkiendon = (data) => {
    return axios.post(`/api/create-linhkiendon`, data);
}

// get all
const getAllUser = () =>{
    return axios.get('api/get-all-user')
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

const deleteLinhkiendon = (donId) => {
        console.log(donId)
    return axios.delete('/api/delete-linhkiendon', {
        params: { id: donId } // ⛔ Đây chỉ đúng với GET request
    });
};

const deleteAS = (donId) => {
        console.log(donId)
    return axios.delete('/api/delete-as', {
        params: { id: donId } // ⛔ Đây chỉ đúng với GET request
    });
};

export { handleLoginApi, getAllPosition , 
    createUser , getAllUser , deleteUser, 
    getAllJob ,getAllCustomer ,getAllMay,
    createMay ,addCustomer, createDon, getAllMark, addMark,
    createlinhkiendon, getAlllinhkiendon, getLinhkienByDonmay,
    deleteLinhkiendon, handleCreateAS, handleCreateTM, 
    getSacombankByMonthGrouped , deleteAS
};