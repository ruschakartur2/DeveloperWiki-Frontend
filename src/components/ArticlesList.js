import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {retrieveArticles} from "../actions/articles";
import ReactHtmlParser from 'react-html-parser';
import {findArticleByTitle} from '../actions/articles';
import { Link } from "react-router-dom";

const ArticlesList = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

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
                            <Link
                                to={"/articles/" + article.id}
                                className=""
                            >
                            <h5 className="card-title">{article.title}</h5>
                            </Link>
                            <h6 className="card-subtitle mb-2 text-muted">{article.author.email}</h6>
                            <p className="card-text">{ReactHtmlParser (article.body)}</p>
                            {article.author.id == currentUser.id &&
                            <Link
                                to={"/articles/" + article.id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                            }

                        </div>
                    </div>
                )) : (<div>No articles now. Add here: click</div>)}

        </div>
    )
}
export default ArticlesList;
