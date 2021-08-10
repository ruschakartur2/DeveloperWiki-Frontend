import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ArticleDataService from '../../services/article.service';
import {Waypoint} from 'react-waypoint';
import {deleteArticle, setCurrentPage} from '../../actions/articles';
import ReactHtmlParser from 'react-html-parser';
import {Link} from "react-router-dom";
import CommentTree from "../Comments/CommentTree";
import AddComment from "../Comments/AddComment";
import {retrieveComments, retrieveCommentsMore} from "../../actions/comments";

const Article = (props) => {
    const initialArticleState = {
        id: null,
        title: "",
        body: "",
        slug: "",
        created_at: "",
    };


    const [currentArticle, setCurrentArticle] = useState(initialArticleState);
    const {user: currentUser} = useSelector((state) => state.auth);
    const comments = useSelector((state) => state.comments.comments);
    const currentPage = useSelector((state) => state.comments.currentPage);
    const dispatch = useDispatch();
    const [commentPage, setCommentPage] = useState(currentPage + 1);
    const [loadedAll, setLoadedAll] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getArticle = id => {
        ArticleDataService.get(id)
            .then(response => {
                setCurrentArticle(response.data);
            })
    }
    const deleted = 'Article deleted'
    const removeArticle = () => {
        dispatch(deleteArticle(currentArticle.slug))
            .then(() => {
                dispatch(setCurrentPage(1))
                props.history.push({
                    pathname: '/articles',
                    state: {
                        type: 'deleted',
                        message: deleted,
                    },
                })
            });
    }


    useEffect(() => {
        getArticle(props.match.params.id)
    }, [props.match.params.id])


    useEffect(() => {
        dispatch(retrieveComments(currentArticle, currentPage));
    }, [currentArticle, currentPage, dispatch])


    const nextPage = () => {
        dispatch(retrieveCommentsMore(currentArticle, commentPage))
            .then((res) => {
                setCommentPage(commentPage + 1)
                if (res === undefined) {
                    setLoadedAll(true);
                }
            })
            .catch((err) => {
                setLoadedAll(true);
            })
    }


    return (
        <div className="container">
            <div className="well">
                <div className="row">
                    <div className="col-md-12">
                        <div className="">
                            <h1 className="hidden-xs hidden-sm">{currentArticle.title} </h1>
                            <hr/>
                            <h5 className="text-danger">{currentArticle.tags && currentArticle.tags.length >= 1 ? currentArticle.tags.map((tag, key) => (
                                <span key={key} className="badge badge-dark mr-3">{tag}</span>
                            )) : (<span className="badge badge-dark">Without tag</span>)}</h5>
                            <hr/>
                            <small
                                className="text-muted">{currentArticle.created_at} | {currentArticle.visits}</small><br/>
                            <small><strong>{currentArticle.author && currentArticle.author.email && ( <div>
                                <Link to={  {pathname: "/profile/" + currentArticle.author.id, state: {id: currentArticle.author.id}}}
                                      className="mt-2 mb-2 text-muted">{currentArticle.author.email}</Link>
                            </div>)}</strong></small>
                            <hr/>
                            {currentArticle.author && currentUser && currentArticle.author.id === currentUser.id && (
                                <div>
                                    <Link
                                        to={"/update/" + currentArticle.slug}
                                        className="btn btn-warning"
                                        params={{ article: currentArticle.slug }}
                                    >
                                        Edit
                                    </Link>
                                    <small className="btn btn-danger ml-4" onClick={removeArticle}>Delete</small>

                                </div>
                            )}
                            <hr/>
                            <div className="text-justify">
                                {ReactHtmlParser(currentArticle.body)}
                            </div>
                        </div>
                        <hr/>

                        {currentArticle && comments && comments.length >= 1 && comments.map((comment,index)=>(
                            <div>
                                <CommentTree comment={comment} author={comment.author} article={currentArticle}/>

                                <hr/>

                            </div>
                        ))}
                        {comments.length >= 10 && !loadedAll ? (
                            <Waypoint onEnter={nextPage}/>
                        ) : <div className="ml-4">No more comments</div>}
                        <h2 className="ml-4">Write now!</h2>
                        <AddComment article={currentArticle}/>

                    </div>

                </div>
            </div>
        </div>
    )

}

export default Article;
