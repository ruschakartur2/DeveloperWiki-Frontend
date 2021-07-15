import {
    ARTICLE_CREATE,
    ARTICLE_RETRIEVE,
    ARTICLE_UPDATE,
    ARTICLE_DELETE,
    SET_CURRENT_PAGE,
} from "../actions/types";

const initialState = {
    items: [],
    currentItem: {},
    currentPage: 1,
    totalCount: 0,
};

function articleReducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case ARTICLE_CREATE:

            return [...state.items,payload];

        case ARTICLE_RETRIEVE:
            return {
                ...state,
                items: action.payload.results,
                totalCount: action.payload.count,
            };


        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };

        case ARTICLE_UPDATE:
            return state.items.map((article)=>{
                if(article.id === payload.id){
                    return {
                        ...article,
                        ...payload,
                    };
                } else {
                    return article;
                }
            });

        case ARTICLE_DELETE:
            return state.items.filter(({id}) => id !== payload.id);

        default:
            return state;
    }
}

export default articleReducer;
