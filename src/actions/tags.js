import {
    TAG_RETRIEVE,
    TAG_CREATE,
    TAG_DELETE,

} from './types';

import TagService from "../services/tag.service";


export const retrieveTags = () => async (dispatch) => {
    try {
        const res = await TagService.getAll();
        dispatch({
            type: TAG_RETRIEVE,
            payload: res.data.results,

        });
        return Promise.resolve(res.data);

    } catch (err) {
        console.log(err);
    }
}
export const createTag = (title) => async (dispatch) =>{
    try {
        const res = await TagService.create(title);
        dispatch({
            type: TAG_CREATE,
            payload: res.data
        });
        return Promise.resolve(res.data);

    }catch (err) {
        console.log(err);
    }
}

export const deleteTag = id => async (dispatch) => {
    try {
        await TagService.remove(id);

        dispatch({
            type: TAG_DELETE,
            payload: {id},
        });
    } catch (err) {
        console.log(err)
    }
}
