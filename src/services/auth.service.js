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
const githubLogin = (code) => {
    return axios.post(USERS_URL + 'oauth/social/token_user/', {
        'code': code,
        'provider': 'github',
    })
        .then((res) => {
            if (res.data.token) {
                localStorage.setItem("user", JSON.stringify({id: res.data.id, email: res.data.email}));
                localStorage.setItem("token", JSON.stringify(res.data.token));
                localStorage.setItem("profile", JSON.stringify({id: res.data.id,
                    email: res.data.email,
                    nickname: res.data.nickname,
                    image: res.data.image}));
            }
            return res.data;
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
