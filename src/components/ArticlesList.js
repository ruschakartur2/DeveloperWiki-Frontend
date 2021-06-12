import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {retrieveArticles, findArticleByTitle} from "../actions/articles";

const ArticlesList = () => {
    const articles = useSelector(state=>state.articles);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(retrieveArticles());
    },[])

    return (
        <div>
            <h1>ds</h1>

                {articles.map((article,index) => (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{article.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{article.author}</h6>
                            <p className="card-text">{article.body}</p>

                        </div>
                    </div>
                ))}

        </div>
    )
}
export default ArticlesList;