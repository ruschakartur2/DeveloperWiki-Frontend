import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getArticleByTag, retrieveArticles, findArticleByTitle, setCurrentPage} from "../actions/articles";

import {createPages} from '../pagesCreator';
import ReactHtmlParser from 'react-html-parser';
import {Link} from "react-router-dom";
import {retrieveTags} from "../actions/tags";

const ArticlesList = (props) => {
    const articles = useSelector(state => state.articles.items);
    const tags = useSelector(state => state.admin.tags);
    const currentPage = useSelector(state => state.articles.currentPage);

    const totalCount = useSelector(state => state.articles.totalCount);
    const dispatch = useDispatch();
    const [activeNew, setActiveNew] = useState(false);
    const [activePopular, setActivePopular] = useState(false);
    const [searchTitle, setSearchTitle] = useState("");
    const pagesCount = Math.ceil(totalCount / 10)
    const pages = [];
    const [selectedTag, setSelectedTag] = useState('')
    createPages(pages, pagesCount, currentPage)
    const [message, setMessage] = useState('')
    const [articleSlug, setArticleSlug] = useState('')

    useEffect(() => {
        dispatch(retrieveArticles(currentPage));
        dispatch(retrieveTags());
        if (props.location.state) {
            setMessage(props.location.state.message)
            setArticleSlug(props.location.state.slug)
        }

    }, [currentPage, dispatch, props.location.state]);

    const getByTag = (tag) => {
        dispatch(setCurrentPage(1))
        setSelectedTag(tag)
        if (activeNew) {
            dispatch(getArticleByTag(tag, currentPage, null, true))
        } else if (activePopular) {
            dispatch(getArticleByTag(tag, currentPage, true, null))
        } else {
            dispatch(getArticleByTag(tag, currentPage));
        }
    }
    const getPopulars = () => {
        if (selectedTag) {
            dispatch(getArticleByTag(selectedTag, currentPage, '1', null))
        } else {
            dispatch(retrieveArticles(currentPage, '1', null));
        }
        setActivePopular(true);
        setActiveNew(false);
    }
    const getNewest = () => {
        if (selectedTag) {
            dispatch(getArticleByTag(selectedTag, currentPage, null, '1'))
        } else {
            dispatch(retrieveArticles(currentPage, null, '1'));
        }
        setActivePopular(false);
        setActiveNew(true);
    }
    const clearTags = () => {
        dispatch(retrieveArticles(currentPage));
        setSelectedTag("")
    }

    const closeAlert = () => {
        setArticleSlug(null)
        setMessage(null)
        window.history.replaceState(null, '')
    }

    const findByTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
        dispatch(setCurrentPage(1))
        dispatch(findArticleByTitle(searchTitle, currentPage))
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
                {message && articleSlug && (
                    <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        {message}. <b><Link to={"article/" + articleSlug}>See
                        now</Link></b>
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close"
                                onClick={closeAlert}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>)}


                <h2 className="m-auto">Article list</h2>
                <div className="">
                    <h5>Tag selected: {selectedTag}</h5>
                    <span className="btn btn-warning c-pointer" onClick={clearTags}>Clear</span>
                    <hr/>
                    <span type={"button"} onClick={getPopulars}
                          className={activePopular ? ("text-dark mr-4 border border-danger rounded p-2") : ("text-muted mr-4 p-2")}>Populars</span>
                    <span type={"button"} onClick={getNewest}
                          className={activeNew ? ("text-dark mr-4 border border-danger rounded p-2") : ("text-muted mr-4 p-2")}>Recently added</span>
                </div>
                <hr/>
                {articles && articles.length >= 1 ? articles.map((article, index) => (
                    <div className="card" key={index}>
                        <div className="card-body max-font-size">
                            <Link
                                to={"/article/" + article.slug}
                                className=""
                            >
                                <h3 className="card-title">{article.title}</h3>
                            </Link>
                            <h5 className="text-danger">{article.tags && article.tags.length >= 1 ? article.tags.map((tag, key) => (
                                <span key={key} role="button" className="badge badge-dark  mr-3" onClick={() => {
                                    getByTag(tag)
                                }}>{tag}</span>
                            )) : (<span className="badge badge-dark">Without tag</span>)}</h5>
                            <div>
                                <Link to={  {pathname: "/profile/" + article.author.id, state: {id: article.author.id}}}
                                      className="mt-2 mb-2 text-muted">{article.author.email}</Link>
                            </div>
                            <small className="text-muted">{article.created_at} | {article.visits}</small><br/>
                            <div className="card-text mt-3">{
                                ReactHtmlParser(article.body.slice(0, 255))
                            }
                                {
                                    article.body.length >= 255 && <Link to={'/article/' + article.slug}>Read more</Link>
                                }
                            </div>


                        </div>
                    </div>
                )) : (<div>No articles now. Add here: <Link to="/add">click</Link></div>)}
                <div className="pages">
                    {pages.map((page, index) => <span key={index}
                                                      className={currentPage === page ? "current-page" : "page"}
                                                      onClick={() => dispatch(setCurrentPage(page))}
                    >{page}</span>)}
                </div>
            </div>
            <ul className="col-4 list-group tag__block overflow-auto list-group-flush">
                {tags && tags.length >= 1 && tags.map((tag, index) => (

                        <li
                            type="button"
                            key={index}
                            onClick={() => getByTag(tag.title)}
                            className={
                                selectedTag === tag.title ?
                                    ('list-group-item d-flex justify-content-between align-items-center active') :
                                    ('list-group-item d-flex justify-content-between align-items-center')
                            }>
                            {tag.title}
                            <span className="badge badge-primary badge-pill">
                        {tag.articles.length}
                        </span>
                        </li>

                    )
                )}
            </ul>
        </div>
    )
}
export default ArticlesList;
