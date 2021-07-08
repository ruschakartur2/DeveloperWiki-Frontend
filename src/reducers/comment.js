import {
    COMMENT_CREATE,
    COMMENT_RETRIEVE,
    COMMENT_DELETE,
} from "../actions/types";

const initialState = {
    comments: [],
    totalCount: null,
};

function commentReducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case COMMENT_CREATE:
            console.log(state);
            return {
                ...state,
                comments: action.payload,
            };

        case COMMENT_RETRIEVE:
            return {
                ...state,
                comments:  action.payload.results,
                totalCount: action.payload.count,
            };

        case COMMENT_DELETE:
            return {
                ...state,
                comments: [...state.comments.filter(({id}) => id !== payload.id)]
            }

        default:
            return state;
    }
}

export default commentReducer;