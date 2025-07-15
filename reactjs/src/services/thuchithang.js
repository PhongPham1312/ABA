import axios from '../axios'


const createThuchithang = (data) => {
    return axios.post(`/api/create-thuchithang`, data);
}




// get all
const getAllthuchithang = () =>{
    return axios.get('api/get-all-thuchithang')
}

// get all
const getAllthuchithangbyparent = (parent) =>{
    return axios.get('/api/get-all-thuchithang-by-parent', {
        params: { id: parent } // ⛔ Đây chỉ đúng với GET request
    })
}



const deletethuchithang = (donId) => {
    return axios.delete('/api/delete-thuchithang', {
        params: { id: donId } // ⛔ Đây chỉ đúng với GET request
    });
};

export { createThuchithang , getAllthuchithang, deletethuchithang, getAllthuchithangbyparent }