import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE, PROFILE_RETRIEVE, PROFILE_UPDATE,
} from "./types";

import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export const register = (email, password) => (dispatch) => {
    return AuthService.register(email, password).then(
        (response) => {
            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: response.data.message,
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const getProfile = (id) => async (dispatch) => {
    try {
        const res = await UserService.getProfile(id);
        dispatch({
            type: PROFILE_RETRIEVE,
            payload: res.data,
        });
        return Promise.resolve(res.data);

    } catch (err) {
        console.log(err);
    }
}
export const profileUpdate = (id, data) => async (dispatch) => {
    try {
        const res = await UserService.updateProfile(id, data);
        dispatch({
            type: PROFILE_UPDATE,
            payload: res,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (data) => {
            console.log(data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    user: data.user,
                    profile: data.profile,
                },
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};
export const githubLogin = (token) =>  async (dispatch) => {
    return await AuthService.githubLogin(token).then(
        (data) => {
            console.log(data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    user: {id: data.id,
                            email: data.email}
                    ,
                    profile: {
                        id: data.id,
                        email: data.email,
                        nickname: data.nickname,
                        image: data.image,
                    },
                },
            });

            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};


export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};
