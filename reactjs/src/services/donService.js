import axios from '../axios'

// create
const createDon = (data) => {
    return axios.post(`/api/create-don`, data);
}


const getAllDon = () =>{
    return axios.get('api/get-all-don')
}

export {
createDon , getAllDon
}