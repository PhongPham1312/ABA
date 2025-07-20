import axios from '../axios'

// create
const createCongthem = (data) => {
    return axios.post(`/api/congthem`, data);
}

const getallcongthem = (userid) => {
    return axios.get(`/api/congthem`, 
        {params: { userid }}
    );
}

export {
createCongthem, getallcongthem
}