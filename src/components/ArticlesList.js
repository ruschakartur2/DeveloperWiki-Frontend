import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {retrieveArticles} from "../actions/articles";

import {createPages} from '../pagesCreator';
import ReactHtmlParser from 'react-html-parser';
import {findArticleByTitle, setCurrentPage} from '../actions/articles';
import { Link } from "react-router-dom";

const ArticlesList = (props) => {
    const articles = useSelector(state=>state.articles.items);
    const currentPage = useSelector(state=>state.articles.currentPage);
    const totalCount = useSelector(state=>state.articles.totalCount);
    const dispatch = useDispatch();

    const [searchTitle,setSearchTitle] = useState("");
    const pagesCount = Math.ceil(totalCount/10)
    const pages =[];

    createPages(pages,pagesCount, currentPage)

    useEffect(()=>{
        dispatch(retrieveArticles(currentPage));

    },[currentPage]);


    const findByTitle = (e) => {

        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
        dispatch(setCurrentPage(1))
        dispatch(findArticleByTitle(searchTitle))
            .then(res => {
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

                {articles && articles.length >=1 ? articles.map((article,index) => (
                    <div className="card">
                        <div className="card-body max-font-size">
                            <Link
                                to={"/article/" + article.slug}
                                className=""
                            >
                            <h3 className="card-title">{article.title}</h3>
                            </Link>

                            <h5 className="mt-2 mb-2 text-muted">{article.author.email}</h5>
                            <small className="text-muted">{article.created_at} | {article.views}</small><br/>
                            <div className="card-text mt-3">{
                                ReactHtmlParser (article.body.slice(0,255))
                            }
                            {
                                article.body.length >= 255 && <Link to={'/article/'+ article.slug}>Read more</Link>
                            }
                            </div>


                        </div>
                    </div>
                )) : (<div>No articles now. Add here: click</div>)}
            <div className="pages">
                {pages.map((page,index) => <span key={index}
                                                 className={currentPage == page ? "current-page" : "page"}
                                                 onClick={() => dispatch(setCurrentPage(page))}
                                            >{page}</span> )}
            </div>
        </div>
    )
}
export default ArticlesList;
