import {
    ARTICLE_CREATE,
    ARTICLE_RETRIEVE,
    ARTICLE_UPDATE,
    ARTICLE_DELETE,
    SET_CURRENT_PAGE,
} from "../actions/types";

const initialState = {
    items: [],
    currentPage: 1,
    totalCount: 0
};

function articleReducer(articles = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case ARTICLE_CREATE:

            return [...articles.items,payload];

        case ARTICLE_RETRIEVE:
            return {
                ...articles,
                items: action.payload.results,
                totalCount: action.payload.count,
            };
        case SET_CURRENT_PAGE:
            return {
                ...articles,
                currentPage: action.payload
            };

        case ARTICLE_UPDATE:
            return articles.map((article)=>{
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
            return articles.items.filter(({id}) => id !== payload.id);

        default:
            return articles;
    }
}

export default articleReducer;