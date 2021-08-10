import {
    TAG_RETRIEVE,
    TAG_CREATE,
    TAG_DELETE, ADMIN_USERS_RETRIEVE, ADMIN_USERS_DELETE, ADMIN_USERS_UPDATE,
} from "../actions/types";

const initialState = {
    tags: [],
    users: [],
    articles: [],
    comments: [],

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

        case ADMIN_USERS_RETRIEVE :
            console.log(state);
            return {
                ...state,
                users: action.payload,
            }
        case ADMIN_USERS_UPDATE:
            return state.users.map((user)=>{
                if(user.id === payload.id){
                    return {
                        ...user,
                        ...payload,
                    };
                } else {
                    return user;
                }
            });
        case ADMIN_USERS_DELETE:
            return state.users.filter(({id}) => id !== payload.id);


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
