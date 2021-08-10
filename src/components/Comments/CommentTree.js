import React, {useState} from 'react';
import AddComment from "./AddComment";
import {useDispatch, useSelector} from "react-redux";
import {deleteComment} from "../../actions/comments";
import {Link} from "react-router-dom";



const CommentTree = (props) => {

    const {isLoggedIn} = useSelector(state => state.auth);
    const {user: currentUser} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [reply, setReply] = useState(false);
    const [more, setMore] = useState(false);

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
    const handleMoreClick = () => {
        setMore(!more);
    }
    const nestedComments = (props.comment.children || []).map(comment => {
        return <CommentTree comment={comment} author={comment.author} article={props.article}/>;
    });
    return (
        <div className="m-3 ml-5">
            <div className="main-content p-3 d-flex">
                <div className="author_side border-bottom border-right p-2">
                    <img src={props.comment.author.image == null ? ('https://w7.pngwing.com/pngs/858/581/png-transparent-profile-icon-user-computer-icons-system-chinese-wind-title-column-miscellaneous-service-logo.png') : (props.comment.author.image) } className="rounded-circle" width={150} height={150} alt=""/>
                    <h5 className="mt-2 p-2 text-center"><Link
                        to={"/profile/" + props.comment.author.id}>{props.comment.author.email}</Link>
                    </h5>
                    {currentUser.id && props.comment.author.id && currentUser.id === props.comment.author.id &&
                    (<p>
                            <button className="btn btn-danger " onClick={removeComment}>Delete</button>
                        </p>
                    )}
                </div>
                <div className="content_side p-3">
                    <div className="badges mt-2">
                    <span className="badge text-left badge-info mr-3">{props.comment.date_posted}</span>
                    <span className="badge badge-light">{props.comment.children.length} replies</span>
                    </div>
                    <p className="mt-2">{props.comment.content}</p>
                    <div className="buttons mt-5">
                        {props.comment.children.length >= 1 && (
                            <button className="btn btn-secondary mr-3" onClick={handleMoreClick}>Show more</button>
                        )}
                        <button className="btn btn-info" onClick={handleReplyClick}>Reply</button>
                    </div>
                </div>
            </div>


            {isLoggedIn && reply && (
                <div> {props.article && (<AddComment article={props.article} parent={props.comment.id}/>)}</div>)}
            {more && (
                <div>
                    {nestedComments}
                </div>
            )}

        </div>
    )
}

export default CommentTree;
