import axios from "axios";

const USERS_URL = "https://swiki.bvblogic.dev/api/v1/accounts/";

const register = (email, password) => {
    return axios.post(USERS_URL + "create/", {
        email,
        password,
    });
};

const login = (email, password) => {
    return axios
        .post(USERS_URL + "login/", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("profile", JSON.stringify(response.data.profile));
            }

            return response.data;
        });
};
const githubLogin = (token) => {
    return axios.post(USERS_URL + 'oauth/', {
        'access_token': token,
        'provider': 'github',
    })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("profile", JSON.stringify(response.data.profile));
            }
        })
}


const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem('token');
};


export default {
    register,
    login,
    githubLogin,
    logout,
};
