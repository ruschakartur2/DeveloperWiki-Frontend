import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {retrieveArticles} from "../actions/articles";
import ReactHtmlParser from 'react-html-parser';
import {findArticleByTitle} from '../actions/articles';

const ArticlesList = () => {
    const articles = useSelector(state=>state.articles);
    const dispatch = useDispatch();

    const [searchTitle,setSearchTitle] = useState("");


    useEffect(()=>{
        dispatch(retrieveArticles());
    },[dispatch]);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }

    const findByTitle = (e) => {
        dispatch(findArticleByTitle(searchTitle)).
            then(res => {
                console.log(res);
        })
    }

    return (
        <div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={onChangeSearchTitle}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByTitle}
                    >
                        Search
                    </button>
                </div>
            </div>
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
