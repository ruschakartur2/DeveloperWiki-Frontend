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



    const findByTitle = (e) => {

        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
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
                    onChange={findByTitle}
                />
                <div className="input-group-append">

                </div>
            </div>

                <h2 className="m-auto">Article list</h2>

                {articles.length>=1 ? articles.map((article,index) => (
                    <div className="card">
                        <div className="card-body max-font-size">
                            <Link
                                to={"/article/" + article.slug}
                                className=""
                            >
                            <h5 className="card-title">{article.title}</h5>
                            </Link>
                            <h6 className="card-subtitle mb-2 text-muted">{article.author.email}</h6>
                            <p className="card-text ">{ReactHtmlParser (article.body)}</p>
                            {currentUser && article.author.id == currentUser.id &&
                            <Link
                                to={"/update/" + article.slug}
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
