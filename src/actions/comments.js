import {
    COMMENT_CREATE,
    COMMENT_RETRIEVE,
    COMMENT_UPDATE,
    COMMENT_DELETE,
} from './types';

import CommentService from "../services/comment.service";

export const createComment = (article,content) => async (dispatch) => {
    try {
        const res = await CommentService.create(article,content);

        dispatch({
            type: COMMENT_CREATE,
            payload: res.data,
        });

        return Promise.resolve(res.data);

    } catch(err) {
        return Promise.reject(err);
    }
};

export const retrieveComments = (articleId) => async (dispatch) => {
    try {
        const res = await CommentService.get(articleId);
        dispatch({
            type: COMMENT_RETRIEVE,
            payload: res.data,

        });
        return Promise.resolve(res.data);

    } catch (err) {
        console.log(err);
    }
}

// export const updateComment = (id,data) => async (dispatch) => {
//     try {
//         const res = CommentService.update(id,data);
//
//         dispatch({
//             type: COMMENT_UPDATE,
//             payload: data,
//         });
//         return Promise.resolve(res.data);
//     } catch (err) {
//         return Promise.reject(err);
//     }
// }

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
