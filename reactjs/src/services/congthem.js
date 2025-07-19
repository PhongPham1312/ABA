import axios from '../axios'

// create
const createCongthem = (data) => {
    return axios.post(`/api/congthem`, data);
}

const getallcongthem = (user, ngay) => {
    return axios.get(`/api/congthem`, 
        {params: { userid: user, ngay: ngay }}
    );
}

export {
createCongthem, getallcongthem
}