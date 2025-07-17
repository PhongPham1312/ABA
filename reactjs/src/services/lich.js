import axios from '../axios'

// create
const createLich = (data) => {
    return axios.post(`/api/create-lich`, data);
}

export {
createLich
}