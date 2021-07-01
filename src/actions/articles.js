import {
    ARTICLE_CREATE,
    ARTICLE_RETRIEVE,
    ARTICLE_UPDATE,
    ARTICLE_DELETE,
    SET_CURRENT_PAGE,
    } from './types';

import ArticleService from "../services/article.service";

export const createArticle = (title,body,author) => async (dispatch) => {
    try {
        const res = await ArticleService.create(title,body,author);

        dispatch({
            type: ARTICLE_CREATE,
            payload: res.data,
        });

        return Promise.resolve(res.data);

    } catch(err) {
        return Promise.reject(err);
    }
};

export const retrieveArticles = (page) => async (dispatch) => {
    try {
        const res = await ArticleService.getAll(page);
        dispatch({
            type: ARTICLE_RETRIEVE,
            payload: res.data,

        });
        return Promise.resolve(res.data);

    } catch (err) {
        console.log(err);
    }
}
export const setCurrentPage = (page) => async (dispatch) => {
    dispatch({
        type: SET_CURRENT_PAGE,
        payload: page,
    })
}

export const updateArticle = (slug,data) => async (dispatch) => {
    try {
        const res = ArticleService.update(slug,data);

        dispatch({
            type: ARTICLE_UPDATE,
            payload: data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export const deleteArticle = (slug) => async (dispatch) => {
    try {
        await ArticleService.remove(slug);

        dispatch({
            type: ARTICLE_DELETE,
            payload: {slug},
        });
    } catch (err) {
        console.log(err)
    }
}

export const findArticleByTitle = (title) => async (dispatch) => {
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