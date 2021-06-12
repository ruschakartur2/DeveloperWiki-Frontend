import React, {useState} from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const AddArticle = () => {

    const [value,setValue] = useState("");
    const handleBodyText = (e) => {
        console.log(e)
    }
    return (
        <ReactQuill theme="snow" value={value} onChange={handleBodyText}/>
    );
}

export default AddArticle;