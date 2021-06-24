import {
    ARTICLE_CREATE,
    ARTICLE_RETRIEVE,
    ARTICLE_UPDATE,
    ARTICLE_DELETE,
} from "../actions/types";

const initialState = [];

function articleReducer(articles = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case ARTICLE_CREATE:
            return [...articles,payload];

        case ARTICLE_RETRIEVE:
            return payload;

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
            return articles.filter(({id}) => id !== payload.id);

        default:
            return articles;
    }
}

export default articleReducer;