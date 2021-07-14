import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getArticleByTag, retrieveArticles} from "../actions/articles";

import {createPages} from '../pagesCreator';
import ReactHtmlParser from 'react-html-parser';
import {findArticleByTitle, setCurrentPage} from '../actions/articles';
import { Link } from "react-router-dom";
import {retrieveTags} from "../actions/tags";

const ArticlesList = () => {
    const articles = useSelector(state=>state.articles.items);
    const tags = useSelector(state=>state.admin.tags);
    const currentPage = useSelector(state=>state.articles.currentPage);
    const totalCount = useSelector(state=>state.articles.totalCount);
    const dispatch = useDispatch();

    const [searchTitle,setSearchTitle] = useState("");
    const pagesCount = Math.ceil(totalCount/10)
    const pages =[];
    const [selectedTag, setSelectedTag] = useState("All")
    createPages(pages,pagesCount, currentPage)

    useEffect(()=>{
        dispatch(retrieveArticles(currentPage));
        dispatch(retrieveTags());

    },[currentPage,dispatch]);

    const getByTag = (tag) => {
        dispatch(setCurrentPage(1))
        dispatch(getArticleByTag(tag,currentPage))
        setSelectedTag(tag)
    }
    console.log(currentPage);
    const clearTags = () => {
        dispatch(retrieveArticles(currentPage));
        setSelectedTag("All")
    }

    const findByTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
        dispatch(setCurrentPage(1))
        dispatch(findArticleByTitle(searchTitle,currentPage))
    }

    return (
        <div className="row">
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
            <div className="col-8">


                <h2 className="m-auto">Article list</h2>
                <div className=""><h5>Tag selected: {selectedTag}</h5> <span className="btn btn-warning c-pointer" onClick={clearTags}>Clear</span></div>
                {articles && articles.length >=1 ? articles.map((article,index) => (
                    <div className="card" key={index}>
                        <div className="card-body max-font-size">
                            <Link
                                to={"/article/" + article.slug}
                                className=""
                            >
                            <h3 className="card-title">{article.title}</h3>
                            </Link>
                            <h5 className="text-danger">{article.tags && article.tags.length>=1 ? article.tags.map((tag,key)=> (
                                <span key={key} role="button" className="badge badge-dark  mr-3" onClick={(e)=>{getByTag(tag)}}>{tag}</span>
                            )) : (<span className="badge badge-dark">Without tag</span>)}</h5>
                            <h5 className="mt-2 mb-2 text-muted">{article.author.email}</h5>
                            <small className="text-muted">{article.created_at} | {article.visits}</small><br/>
                            <div className="card-text mt-3">{
                                ReactHtmlParser (article.body.slice(0,255))
                            }
                            {
                                article.body.length >= 255 && <Link to={'/article/'+ article.slug}>Read more</Link>
                            }
                            </div>


                        </div>
                    </div>
                )) : (<div>No articles now. Add here: <Link to="/add">click</Link></div>)}
            <div className="pages">
                {pages.map((page,index) => <span key={index}
                                                 className={currentPage === page ? "current-page" : "page"}
                                                 onClick={() => dispatch(setCurrentPage(page))}
                                            >{page}</span> )}
            </div>
            </div>
            <div className="col-4 tag__block">
                <h2>Tags</h2>
                {tags && tags.map((tag,index)=> (
                    <p key={index} onClick={(e) => getByTag(tag.title)} className="tag__item">{tag.title}</p>
                    )
                )}
            </div>
        </div>
    )
}
export default ArticlesList;
