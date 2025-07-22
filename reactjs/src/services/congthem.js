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

const updateStatusAll = (userid, ngay) => {
    return axios.post('/api/update-status-all', { userid, ngay });
};

export {
createCongthem, getallcongthem, updateStatusAll
}