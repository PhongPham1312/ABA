import axios from '../axios'

// kho
const create = (data) => {
    return axios.post(`/api/create-kho`, data);
}

// kho tháng
const createKho = (data) => {
    return axios.post(`/api/create-khomonth`, data);
}

// get all
const getAll = () =>{
    return axios.get('api/get-all-kho')
}

// get all tháng
const getAllKhomonth = () =>{
    return axios.get('api/get-all-khomonth')
}

// delete
const deleteKho = (userId) =>{
    return axios.delete('api/delete-kho', {
        data: { id: userId }
    })
}

export { create , getAll , deleteKho , createKho , getAllKhomonth
}; 