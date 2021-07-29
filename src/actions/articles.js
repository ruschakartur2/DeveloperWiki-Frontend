import {
    ARTICLE_CREATE,
    ARTICLE_RETRIEVE,
    ARTICLE_UPDATE,
    ARTICLE_DELETE,
    SET_CURRENT_PAGE, ARTICLE_RETRIEVE_MORE,

} from './types';

import ArticleService from "../services/article.service";
import UserArticles from "../components/UserArticles";

export const createArticle = (title,tags,body,author) => async (dispatch) => {
    try {
        const res = await ArticleService.create(title,tags,body,author);

        dispatch({
            type: ARTICLE_CREATE,
            payload: res.data,
        });

        return Promise.resolve(res.data);

    } catch(err) {
        return Promise.reject(err);
    }
};

export const retrieveArticles = (page,popular, newest,my) => async (dispatch) => {
    try {
        const res = await ArticleService.getAll(page,popular, newest,my);
        dispatch({
            type: ARTICLE_RETRIEVE,
            payload: res.data,

        });
        return Promise.resolve(res.data);

    } catch (err) {
        console.log(err);
    }
}
//
// export const getNewest = (page,newest) => async (dispatch) => {
//     try {
//         const res = await ArticleService.getAll(page, newest);
//         dispatch({
//             type: ARTICLE_RETRIEVE,
//             payload: res.data,
//
//         });
//         return Promise.resolve(res.data);
//
//     } catch (err) {
//         console.log(err);
//     }
// }
//
// export const getPopular = (page,popular) => async (dispatch) => {
//     try {
//         const res = await ArticleService.getAll(page,popular);
//         dispatch({
//             type: ARTICLE_RETRIEVE,
//             payload: res.data,
//
//         });
//         return Promise.resolve(res.data);
//
//     } catch (err) {
//         console.log(err);
//     }
// }

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

export const findArticleByTitle = (title,page) => async (dispatch) => {
    try {
        const res = await ArticleService.findByTitle(title,page);

        dispatch({
            type: ARTICLE_RETRIEVE,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
}

export const getArticleByTag = (tag,page,popular,newest) => async (dispatch) => {
    try {
        const res = await ArticleService.getByTag(tag,page,popular,newest);

        dispatch({
            type: ARTICLE_RETRIEVE,
            payload: res.data,
        });
    }
    catch (err){
        console.log(err)
    }
}

export const getUserArticles = (id,page) => async (dispatch) => {
    try {
        const res = await ArticleService.getUserArticles(id,page);
        console.log(res.data);
        dispatch({
            type: ARTICLE_RETRIEVE,
            payload: res.data,
        })
    }
    catch (err) {
        console.log(err)
    }
}
export const retrieveMoreUserArticles = (id, page) => async (dispatch) => {
    try {
        const res = await ArticleService.getUserArticles(id, page);
        dispatch({
            type: ARTICLE_RETRIEVE_MORE,
            payload: res.data,

        });

    } catch (err) {
        console.log(err);
    }
}