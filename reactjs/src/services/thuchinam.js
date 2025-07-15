import axios from '../axios'


const createThuchinam = (data) => {
    return axios.post(`/api/create-thuchinam`, data);
}




// get all
const getAllthuchinam = () =>{
    return axios.get('api/get-all-thuchinam')
}



const deletethuchi = (donId) => {
        console.log(donId)
    return axios.delete('/api/delete-thuchinam', {
        params: { id: donId } // ⛔ Đây chỉ đúng với GET request
    });
};

export { createThuchinam , getAllthuchinam, deletethuchi
};