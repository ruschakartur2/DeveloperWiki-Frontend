import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ArticleDataService from '../services/article.service';
import {deleteComment} from '../actions/comments';
import ReactHtmlParser from 'react-html-parser';
import { Link } from "react-router-dom";
import {retrieveComments, createComment} from "../actions/comments";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Field must be filled
            </div>
        );
    }
};
const Comment = (props) => {
    const checkBtn = useRef();
    const form = useRef();
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments);
    const [content, setContent] = useState('');
    const [submitted, setSubmitted] = useState(true);
    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(()=>{
        dispatch(retrieveComments(props.article))
    },[props.article])

    const handleNewComment = (e) => {
        e.preventDefault();

        dispatch(createComment(props.article,content))
            .then((res)=>{
                console.log(res);
            })
            .catch(e => {console.log(e)})
        setContent("")
    }

    const onChangeContent = (e) => {
        const content = e.target.value;
        setContent(content);
        setSubmitted(false)
        if (content.length < 1) {
            setSubmitted(true);
        }
    };

    const removeComment = id => {
        dispatch(deleteComment(id))
    };


    return (
        <div className="container bootstrap snippets bootdey">
            <div className="row">
                <div className="col-md-12">
                    <div className="blog-comment">
                        <h3 className="text-success">Comments</h3>
                        <hr/>
                        <ul className="comments">
                            {comments && comments.length >= 1 && comments.map((comment,index) => (
                                <div>  {comment.reply == null && (
                                <li className="clearfix" key={index}>
                                <div className="post-comments">
                                <p className="meta">{comment.date_posted} <span className="author">{comment.author.email}</span> says : <i
                                className="pull-right"></i></p>
                                <p>
                            {comment.content}
                                </p>
                                    {currentUser && comment.author && comment.author.id === currentUser.id && (
                                    <div className="buttons">
                                        <button className="btn btn-danger" onClick={(e)=>{removeComment(comment.id)}}>Delete</button>
                                    </div>
                                    )}
                                </div>
                                </li>
                                     )}</div>
                                    ))}
                        </ul>
                        <div className="add-comment">
                            <Form ref={form} onSubmit={handleNewComment}>
                                <div className="form-group">
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="content"
                                        value={content}
                                        onChange={onChangeContent}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block" disabled={submitted}>
                                    <span>Comment that</span>
                                    </button>
                                    </div>

                                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Comment;