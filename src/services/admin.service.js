import axios from 'axios';


const ADMIN_USERS_URL = "http://localhost:8000/api/admin-panel/"

const getAllUsers = () => {
    return axios.get(ADMIN_USERS_URL + 'accounts/?list=true',
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token ' + JSON.parse((localStorage.getItem('token'))),
            }

        });
};
const getBannedUsers = () => {
    return axios.get(ADMIN_USERS_URL + 'accounts/?banned=true',
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token ' + JSON.parse((localStorage.getItem('token'))),
            }

        });
};

const updateUser = (id, data) => {
    return axios.patch(ADMIN_USERS_URL + 'accounts/' + id, data,{
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Token ' + JSON.parse((localStorage.getItem('token'))),
        }
    })
}

const deleteUser = (pk) => {
    return axios.delete(ADMIN_USERS_URL + 'accounts/' + pk,
        {
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Token ' + JSON.parse((localStorage.getItem('token'))),
            }
        })
}

const AdminService = {
    getAllUsers,
    getBannedUsers,
    deleteUser,
    updateUser,
};

export default AdminService;
