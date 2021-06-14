import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {retrieveArticles} from "../actions/articles";
import ReactHtmlParser from 'react-html-parser';
const ArticlesList = () => {
    const articles = useSelector(state=>state.articles);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(retrieveArticles());
    },[]);

    return (
        <div>
            <h2 className="m-auto">Article list</h2>

                {articles ? articles.map((article,index) => (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{article.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{article.author.email}</h6>
                            <p className="card-text">{ReactHtmlParser (article.body)}</p>

                        </div>
                    </div>
                )) : (<div>No articles now. Add here: click</div>)}

        </div>
    )
}
export default ArticlesList;
