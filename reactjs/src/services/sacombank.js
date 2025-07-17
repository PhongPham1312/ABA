import axios from '../axios'

const createAS = (data) => {
    return axios.post(`/api/create-as`, data);
}

// get position
const getGroupByNgay = () =>{
    return axios.get('api/get-all-by-ngay')
}


const getallasthang = (donId) => {
    return axios.get('/api/get-all-by-thang', {
        params: { thang: donId }
    });
};

export {
    createAS,getGroupByNgay, getallasthang
}