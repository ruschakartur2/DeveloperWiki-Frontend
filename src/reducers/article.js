import {
    ARTICLE_CREATE,
    ARTICLE_RETRIEVE,
    ARTICLE_UPDATE,
    ARTICLE_DELETE,
    SET_CURRENT_PAGE, SET_POPULAR, SET_NEWEST, ARTICLE_RETRIEVE_MORE,
} from "../actions/types";

const initialState = {
    items: [],
    currentItem: {},
    currentPage: 1,
    byPopular: false,
    byNewest: false,
    totalCount: 0,
};

function articleReducer(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case ARTICLE_CREATE:

            return [...state.items,payload];

        case ARTICLE_RETRIEVE:
            console.log(state.items)

            return {
                ...state,
                items: [
                    ...action.payload.results,
                ],
                totalCount: action.payload.count,
            };
        case ARTICLE_RETRIEVE_MORE:
            console.log(state.items)
            return {
                ...state,
                items: [
                    ...state.items, ...action.payload.results,
                ]
            };


        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            };

        case SET_POPULAR:
            return {
                ...state,
                byPopular: action.payload,
                totalCount: action.payload.count,

            }
        case SET_NEWEST:
            return {
                ...state,
                byNewest: action.payload,
                totalCount: action.payload.count,

            }

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
