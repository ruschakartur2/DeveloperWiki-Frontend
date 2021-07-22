import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteComment} from '../actions/comments';


import AddComment from "./AddComment";
import {Link} from "react-router-dom";

const Comment = (props) => {

    const { isLoggedIn } = useSelector(state => state.auth);

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [reply,setReply] = useState(false);

    const removeComment = () => {
        dispatch(deleteComment(props.comment.id))
            .then(() => {
                console.log('deleted');
                if (props.comment.parent) {
                    window.location.reload();
                }
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
            <p>{props.comment.date_posted} | <Link to={{pathname: "/profile/" + props.author.id, state: {id: props.author.id}}} className="mt-2 mb-2 author">{props.author.email}</Link>
            </p>


                <hr/>
        <p>{props.comment.content}</p>
            <hr/>
            </div>
            <div className="optional">
                {currentUser.id && props.author.id && currentUser.id === props.author.id &&
                ( <small className="btn btn-danger" onClick={removeComment}>delete</small>
                )}
                <span onClick={handleReplyClick}>Reply</span>
                {isLoggedIn && reply && (<div> {props.article && (<AddComment article={props.article} parent={props.comment.id}/>)}</div>) }

                </div>

        </div>
        )}
    </div>
    )

}

export default Comment;
