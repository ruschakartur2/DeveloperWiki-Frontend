import {
    ARTICLE_CREATE,
    ARTICLE_RETRIEVE,
    ARTICLE_UPDATE,
    ARTICLE_DELETE,
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

export const retrieveArticles = () => async (dispatch) => {
    try {
        const res = await ArticleService.getAll();
        dispatch({
            type: ARTICLE_RETRIEVE,
            payload: res.data.results,

        });
    } catch (err) {
        console.log(err);
    }
}

export const updateArticle = (slug,data) => async (dispatch) => {
    try {
        const res = ArticleService.update(slug,data);

        dispatch({
            type: ARTICLE_UPDATE,
            payload: data.results,
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

export const findArticleByTitle = (title) => async (dispatch) => {
    try {
        const res = await ArticleService.findByTitle(title);

        dispatch({
            type: ARTICLE_RETRIEVE,
            payload: res.data.results,
        });
    } catch (err) {
        console.log(err);
    }
}