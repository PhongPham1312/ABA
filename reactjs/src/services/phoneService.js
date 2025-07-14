import axios from '../axios'

// create
const createPhone = (data) => {
    return axios.post(`/api/create-phone`, data);
}

// get all
const getAllPhones = () =>{
    return axios.get('api/get-all-phone')
}

export {
createPhone, getAllPhones
}