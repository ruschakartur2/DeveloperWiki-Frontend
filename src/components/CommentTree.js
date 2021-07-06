import React from 'react';
import Comment from './Comment';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  
    margin-left: ${props => `${props.level*30}px`};
    margin-top: 10px;
`


const CommentTree = (props) => {

    const level = props.level || 0;
    return (
        <StyledWrapper level={level}>
            {props.comments.map((comment, i) => {
                return <div key={`level-${level}-${i}`}>
                    <Comment {...comment}/>
                    <CommentTree comments={comment.children} level={level+1}/>
                    </div>
            })}
        </StyledWrapper>
    )
}

export default CommentTree;
