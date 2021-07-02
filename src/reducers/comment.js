import {
    COMMENT_CREATE,
    COMMENT_RETRIEVE,
    COMMENT_UPDATE,
    COMMENT_DELETE
} from "../actions/types";

const initialState = [];

function commentReducer(comments = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case COMMENT_CREATE:
            return [...comments,payload];

        case COMMENT_RETRIEVE:
            return payload

        // case COMMENT_UPDATE:
        //     return comments.map((comment)=>{
        //         if(comment.id === payload.id){
        //             return {
        //                 ...comment,
        //                 ...payload,
        //             };
        //         } else {
        //             return comment;
        //         }
        //     });

        case COMMENT_DELETE:
            return comments.filter(({id}) => id !== payload.id);

        default:
            return comments;
    }
}

export default commentReducer;