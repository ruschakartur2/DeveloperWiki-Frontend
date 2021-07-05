import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteComment} from '../actions/comments';



const Comment = (comment) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();



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
                <span>Reply</span>

            </div>
        </div>

    )

}

export default Comment;
