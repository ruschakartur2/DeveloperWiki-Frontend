import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteComment, retrieveComments} from '../actions/comments';


import AddComment from "./AddComment";

const Comment = (props) => {

    const { isLoggedIn } = useSelector(state => state.auth);

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [reply,setReply] = useState(false);

    const removeComment = (e) => {
        e.preventDefault();
        dispatch(deleteComment(props.comment.id))
            .then(() => {
                console.log('deleted');
                dispatch(retrieveComments(props.article, 1))
                e.preventDefault();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleReplyClick = () => {
        setReply(!reply);
    }
    return (
        <div>
        {props.comment && props.author && props.comment.id !== null && (
        <div className="comment-block">

            <div className="test">
            <p>{props.comment.date_posted} | <i className="author"> {props.author.email} </i></p>

            <hr/>
        <p>{props.comment.content}</p>
            <hr/>
            </div>
            <div className="optional">
                {currentUser.id && props.author.id && currentUser.id === props.author.id &&
                ( <small className="btn btn-danger" onClick={removeComment}>delete</small>
                )}
                <span onClick={handleReplyClick}>Reply</span>
                {isLoggedIn && reply && (<div> {comment.article && (<AddComment article={comment.article} parent={comment.id}/>)}</div>) }

                </div>

        </div>
        )}
    </div>
    )

}

export default Comment;
