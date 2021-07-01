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
      }

      return response.data.user;
    });
};

const github = () => {

}

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem('token');
};

export default {
  register,
  login,
  github,
  logout,
};
