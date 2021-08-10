import {
    ADMIN_USERS_DELETE,
    ADMIN_USERS_RETRIEVE, ADMIN_USERS_UPDATE, ARTICLE_DELETE, ARTICLE_UPDATE
} from './types';

import AdminService from "../services/admin.service";
import ArticleService from "../services/article.service";

export const retrieveUsersList = () => async (dispatch) => {
    try {
        const res = await AdminService.getAllUsers();
        dispatch({
            type: ADMIN_USERS_RETRIEVE,
            payload: res.data,

        });
        return Promise.resolve(res.data);

    } catch (err) {
        console.log(err);
    }
}
export const retrieveBannedUsers = () => async (dispatch) => {
    try {
        const res = await AdminService.getBannedUsers();
        dispatch({
            type: ADMIN_USERS_RETRIEVE,
            payload: res.data,

        });
        return Promise.resolve(res.data);

    } catch (err) {
        console.log(err);
    }
}
export const updateUser = (id,data) => async (dispatch) => {
    try {
        const res = await AdminService.updateUser(id,data);

        dispatch({
            type: ADMIN_USERS_UPDATE,
            payload: data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteUser = (id) => async (dispatch) => {
    try {
        await AdminService.deleteUser(id);

        dispatch({
            type: ADMIN_USERS_DELETE,
            payload: id,
        });
    } catch (err) {
        console.log(err)
    }
}