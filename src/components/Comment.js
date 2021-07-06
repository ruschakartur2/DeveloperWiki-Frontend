
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteComment} from '../actions/comments';


import AddComment from "./AddComment";


const Comment = (comment) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [reply,setReply] = useState(false);

    const removeComment = (e) => {
        e.preventDefault();
        dispatch(deleteComment(comment.id))
            .then(() => {
                console.log('deleted');
                window.location.reload();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleReplyClick = (e) => {
        setReply(!reply);
    }

    return (
        <div className="comment-block">
            <div className="test">
            <p>{comment.date_posted} | <i className="author"> {comment.author.email} </i></p>
            <hr/>
        <p>{comment.content}</p>
            <hr/>
            </div>
            <div className="optional">
                {currentUser.id && comment.author.id && currentUser.id === comment.author.id &&
                ( <small className="btn btn-danger" onClick={removeComment}>delete</small>
                )}
                <span onClick={handleReplyClick}>Reply</span>
                {reply && (<div> {comment.article && (<AddComment article={comment.article} parent={comment.id}/>)}</div>) }
                <span>Reply</span>
                </div>
        </div>

    )

}

export default Comment;
