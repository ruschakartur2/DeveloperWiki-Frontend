import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ArticleDataService from '../services/article.service';
import {deleteArticle} from '../actions/articles';
import ReactHtmlParser from 'react-html-parser';
import {Link} from "react-router-dom";
import CommentTree from "./CommentTree";
import AddComment from "./AddComment";
import {retrieveComments} from "../actions/comments";

const Article = (props) => {
    const initialArticleState = {
        id: null,
        title: "",
        body: "",
        slug: "",
        created_at: "",
    };

    const initialCommentsState = [
        {
            id: null,
            content: "",
            author: null,
            parent: null,
            children: null
        }
    ]

    const [currentArticle, setCurrentArticle] = useState(initialArticleState);
    //const [comments, setComments] = useState(initialCommentsState);
    const {user: currentUser} = useSelector((state) => state.auth);
    const comments = useSelector((state)=> state.comments.comments);
    const dispatch = useDispatch();

    const getArticle = id => {
        ArticleDataService.get(id)
            .then(response => {
                setCurrentArticle(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }
    const removeArticle = () => {
        dispatch(deleteArticle(currentArticle.slug))
            .then(() => {
                props.history.push("/articles/");
            })
            .catch(e => {
                console.log(e);
            });
    };


    useEffect(() => {
        getArticle(props.match.params.id);
    }, [props.match.params.id])



    if (currentArticle.id) {
    }
    useEffect(()=> {
        dispatch(retrieveComments(currentArticle, 1))

    }, [currentArticle])

    return (
        <div className="container">
            <div className="well">
                <div className="row">
                    <div className="col-md-12">
                        <div className="">
                            <h1 className="hidden-xs hidden-sm">{currentArticle.title} </h1>
                            <hr/>
                            <hr/>
                            <small
                                className="text-muted">{currentArticle.created_at} | {currentArticle.views}</small><br/>
                            <small><strong>{currentArticle.author && currentArticle.author.email}</strong></small>
                            <hr/>
                            {currentArticle.author && currentUser && currentArticle.author.id === currentUser.id && (
                                <div>
                                    <Link
                                        to={"/update/" + currentArticle.slug}
                                        className="btn btn-warning"
                                    >
                                        Edit
                                    </Link>
                                    <small className="btn btn-danger ml-4" onClick={removeArticle}>delete</small>

                                </div>
                            )}
                            <hr/>
                            <div className="text-justify">
                                {ReactHtmlParser(currentArticle.body)}
                            </div>
                        </div>
                        <hr/>
                        {currentArticle && comments && comments.length >= 1 && (
                            <div><CommentTree comments={comments} article={currentArticle.id}/>
                            </div>)}
                        <AddComment article={currentArticle}/>

                    </div>
                </div>
            </div>
        </div>
    )

}

export default Article;