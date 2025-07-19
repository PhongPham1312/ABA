import axios from '../axios'

// create
const createOrUpdateLich = (data) => {
    return axios.post(`/api/create-lich`, data);
}

const getlichbyuser = (user) => {
    return axios.get(`/api/get-lich-tuan-hientai`, 
        {params: { userid: user }}
    );
}

const getLichByUserAndRange = (userId, startDate, endDate) => {
  return axios.get('/api/get-lich-by-user', {
    params: { userId, startDate, endDate }
  });
};

const getLichByUser = (userId) => {
  return axios.get(`/api/get-lich-by-user-all`, {
    params: { userId },
  });
};

export {
createOrUpdateLich, getlichbyuser, getLichByUserAndRange, getLichByUser
}