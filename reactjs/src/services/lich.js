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

 const updateLichStatus = (userid, ngay) => {
    return axios.post('/api/update-lich-status', { userid, ngay });
};
const ketthuctuan = (userid, dsngay, ngay, thuchi) => {
    return axios.post('/api/xac-nhan-endtuan', { userid, dsngay, ngay, thuchi });
};
export {
createOrUpdateLich, getlichbyuser, getLichByUserAndRange,
 getLichByUser, updateLichStatus, ketthuctuan
}