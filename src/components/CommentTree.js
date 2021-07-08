import React from 'react';
import Comment from './Comment';
import styled from 'styled-components';


const StyledWrapper = styled.div`
  
    margin-left: ${props => `${props.level*15}px`};
    margin-top: 10px;
`


const CommentTree = (props) => {
    const level = props.level || 0;
    return (
        <div>
          <StyledWrapper level={level}>
                {props.comments && props.comments.length>=1 && props.comments.map((comment, i) => {
                    return <div key={`level-${level}-${i}`}>
                        <Comment {...comment}/>
                        <CommentTree comments={comment.children} level={level+1}/>
                    </div>
                })}
            </StyledWrapper>
        </div>
    )
}



export default CommentTree;
