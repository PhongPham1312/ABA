import axios from '../axios'

// create
const createLich = (data) => {
    return axios.post(`/api/create-lich`, data);
}

const getlichbyuser = (user) => {
    return axios.get(`/api/get-lich-tuan-hientai`, 
        {params: { userid: user }}
    );
}

export {
createLich, getlichbyuser
}