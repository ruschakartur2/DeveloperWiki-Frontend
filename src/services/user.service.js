import axios from "axios";


const USERS_URL = "http://127.0.0.1:8000/api/accounts/";


const getProfile = (id) => {
    return axios.get(USERS_URL+'profile/'+id,{
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Token '+JSON.parse((localStorage.getItem('token'))),
        }
    })
}
const updateProfile = (id,data) => {
    return axios.patch(USERS_URL+'profile/'+id, data, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Token '+JSON.parse((localStorage.getItem('token'))),
        }
    } )
}

export default {
    getProfile,
    updateProfile,
}