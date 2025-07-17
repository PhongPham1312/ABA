import axios from '../axios'

const createTM = (data) => {
    return axios.post(`/api/create-tm`, data);
}

// get position
const getTienmatkByMonthGrouped = () =>{
    return axios.get('api/get-all-tm-by-ngay')
}


const getallasthang = (donId) => {
    return axios.get('/api/get-all-tm-by-thang', {
        params: { thang: donId }
    });
};

export {
    createTM , getTienmatkByMonthGrouped, getallasthang
}