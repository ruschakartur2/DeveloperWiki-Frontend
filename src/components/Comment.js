import React, {useRef, useState} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {deleteComment, updateComment} from '../actions/comments';


import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const Comment = (comment) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const checkBtn = useRef();
    const form = useRef();

    const [content,setContent] = useState("");
    const [reply,setReply] = useState(false);

    const removeComment = (e) => {
        e.preventDefault();
        dispatch(deleteComment(comment.id))
            .then(() => {
                console.log('deleted');
            })
            .catch(e => {
                console.log(e);
            });
    };
    const handleReplyClick = (e) => {
        setReply(true);
    }
    const onChangeContent = (e) => {
        const content = e.target.value;
        setContent(content);
    };


    return (
        <div className="comment-block">
            <div className="test">
            <p>{comment.date_posted} | <i className="author"> {comment.author.email} </i></p>
            <hr/>
        <p>{comment.content}</p>
            <hr/>
            </div>
            <div className="optional">
                {currentUser.id && comment.author.id && currentUser.id == comment.author.id &&
                ( <small className="btn btn-danger" onClick={removeComment}>delete</small>
                )}
                <span onClick={handleReplyClick}>Reply</span>

            </div>
        </div>

    )

}

export default Comment;