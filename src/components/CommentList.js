import React, {useEffect, } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {retrieveComments} from "../actions/comments";

import CommentTree from './CommentTree';
import AddComment from './AddComment';


const CommentList = (props) => {
    const comments = useSelector((state) => state.comments);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(retrieveComments(props.article))
    },[props.article, dispatch])

    return (
        <ul>
                <CommentTree comments={comments}/>
                <AddComment article={props.article.id}/>
        </ul>
    )

}

export default CommentList;