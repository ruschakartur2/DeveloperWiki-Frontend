import React, {useRef, useState} from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const AddArticle = () => {
    const [loading, setLoading] = useState(false);
    const form = useRef();
    const checkBtn = useRef();

    const [body,setBody] = useState("");
    const [title,setTitle] = useState("");


    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };
    const onChangeBody = (e) => {
        const body = e;
        console.log(body);
        setBody(body);
    };

    const handleSubmit = (e) => {
        console.log(e);
    };

    return (
        <div>
            <h2 className="m-auto">New article</h2>
            <Form onSubmit={handleSubmit} ref={form}>
                <div className="form-group">
                    <label htmlFor="email">Title</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="email"
                        value={title}
                        onChange={onChangeTitle}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="body">
                        <ReactQuill name="body" theme="snow" value={body} onChange={onChangeBody}/>
                    </label>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Add article</span>
                    </button>
                </div>


                <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
        </div>
        );
};

export default AddArticle;
