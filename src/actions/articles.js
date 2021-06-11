import {
    ARTICLE_CREATE,
    ARTICLE_RETRIEVE,
    ARTICLE_UPDATE,
    ARTICLE_DELETE,
    } from './types';

import ArticleService from "../services/article.service";

export const createArticle = (title,user,body) => async (dispatch) => {
    try {
        const res = await ArticleService.create({title,user.body});

        dispatch({
            type: ARTICLE_CREATE,
            payload: res.data,
        });

        return Promise.resolve(res.data);

    } catch(err) {
        return Promise.reject(err);
    }
};

export const retrieveArticles = () => async (dispatch) => {
    try {
        const res = await ArticleService.getAll();

        dispatch({
            type: ARTICLE_RETRIEVE,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
}

export const updateArticles = (id,data) => async (dispatch) => {
    try {
        const res = ArticleService.update(id,data);

        dispatch({
            type: ARTICLE_UPDATE,
            payload: data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteArticle = (id) => async (dispatch) => {
    try {
        await ArticleService.remove(id);

        dispatch({
            type: ARTICLE_DELETE,
            payload: {id},
        });
    } catch (err) {
        console.log(err)
    }
}

export const findByTitle = (title) => async (dispatch) => {
    try {
        const res = await ArticleService.findByTitle(title);

        dispatch({
            type: ARTICLE_RETRIEVE,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
}