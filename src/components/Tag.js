import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createTag, retrieveTags} from "../actions/tags";

const Tag = () => {
    const dispatch = useDispatch();
    const tags = useSelector((state)=>state.admin.tags)

    const [title,setTitle] = useState();

    useEffect(()=>{
        dispatch(retrieveTags());
    },[dispatch])

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    }
    const handleNewTag = (e) => {
        e.preventDefault();
        dispatch(createTag(title))
            .then((res)=>{
                console.log(res);
            })
    }
    return (
        <div>
            <h2>Tags</h2>
            {tags && tags.map((tag,index)=> (
                    <p key={index} className="tag__item">{tag.title}</p>
                )
            )}
            <input type="text" value={title} onChange={onChangeTitle}/>
            <button onClick={handleNewTag}>Add</button>

        </div>
    )
}
export default Tag;