import axios from "axios";


const USERS_URL = "https://swiki.bvblogic.dev/api/v1/accounts/";


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
