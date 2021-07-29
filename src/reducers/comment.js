import {
    COMMENT_CREATE,
    COMMENT_RETRIEVE,
    COMMENT_DELETE, COMMENT_RETRIEVE_MORE,
} from "../actions/types";

const initialState = {
    comments: [

    ],
    totalCount: null,
    currentPage: 1,
    newChild: false,
};

function commentReducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case COMMENT_CREATE:
            return {
                ...state,
                pageNumber: state.pageNumber + 1,
                comments: [...state.comments, action.payload],
                loading: false,
                show: {}
            };


        case COMMENT_RETRIEVE:
            return {
                ...state,
                comments: [
                    ...action.payload.results,
                ],
                totalCount: action.payload.count,
            };

        case COMMENT_RETRIEVE_MORE:
            return {
                ...state,
                comments: [
                    ...state.comments, ...action.payload.results,
                ],

            }

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