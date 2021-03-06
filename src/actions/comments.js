import {
    COMMENT_CREATE,
    COMMENT_RETRIEVE,
    COMMENT_DELETE,
    SET_CURRENT_COMMENT_PAGE, COMMENT_RETRIEVE_MORE,
} from './types';

import CommentService from "../services/comment.service";

export const createComment = (article, content, parent) => async (dispatch) => {
    try {
        const res = await CommentService.create(article, content, parent);

        dispatch({
            type: COMMENT_CREATE,
            payload: res.data,
        });

        return Promise.resolve(res.data);

    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveComments = (articleId, page) => async (dispatch) => {
    try {
        const res = await CommentService.get(articleId, page);
        dispatch({
            type: COMMENT_RETRIEVE,
            payload: res.data,

        });
        return Promise.resolve(res.data);

    } catch (err) {
        console.log(err);
    }
}

export const retrieveCommentsMore = (articleId, page) => async (dispatch) => {
    try {
        const res = await CommentService.get(articleId, page);
        dispatch({
            type: COMMENT_RETRIEVE_MORE,
            payload: res.data,

        });
        return Promise.resolve(res.data);

    } catch (err) {
        console.log(err);
    }
}



export const deleteComment = id => async (dispatch) => {
    try {
        await CommentService.remove(id);

        dispatch({
            type: COMMENT_DELETE,
            payload: {id},
        });
    } catch (err) {
        console.log(err)
    }
}

export const setCurrentPage = (page) => async (dispatch) => {
    dispatch({
        type: SET_CURRENT_COMMENT_PAGE,
        payload: page,
    })
}