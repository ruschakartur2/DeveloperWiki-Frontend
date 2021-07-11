import {
    TAG_RETRIEVE,
    TAG_CREATE,
    TAG_DELETE,
} from "../actions/types";

const initialState = {
    tags: [],

};

function adminReducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case TAG_CREATE:
            return {
                ...state,
                tags: [
                    ...state.tags,action.payload
                ],
            }
        case TAG_RETRIEVE:
            return {
                ...state,
                tags: action.payload,
            };

        case TAG_DELETE:
            return state.tags.filter(({id}) => id !== payload.id);

        default:
            return state;
    }
}

export default adminReducer;
