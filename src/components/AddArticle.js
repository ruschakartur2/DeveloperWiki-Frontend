import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {createArticle, setCurrentPage} from "../actions/articles";
import {Redirect} from 'react-router-dom';
import {retrieveTags} from "../actions/tags";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};


const AddArticle = (props) => {

    const {user: currentUser} = useSelector((state) => state.auth);
    const {isLoggedIn} = useSelector(state => state.auth);
    const tags = useSelector(state => state.admin.tags);
    const dispatch = useDispatch();

    const checkBtn = useRef();
    const form = useRef();

    const [body, setBody] = useState("");
    const [title, setTitle] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [selectedTags, setSelectedTags] = useState([])

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };
    const onChangeBody = (e) => {
        const body = e;
        setBody(body);
    };
    const onChangeTags = (e) => {
        let tags = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedTags(tags)
    }

    useEffect(() => {
        dispatch(retrieveTags());
    }, [dispatch]);

    const handleAdd = (e) => {
        e.preventDefault();
        console.log(selectedTags);
        console.log(currentUser.id)
        dispatch(createArticle(title, selectedTags, body.toString(), currentUser.id))
            .then((data) => {
                setSubmitted(true);
                dispatch(setCurrentPage(1))
                props.history.push('/articles')
                console.log(data);
            }).catch(e => {
            console.log(e);
        })
    };
    if (!isLoggedIn) {
        return <Redirect to="/login"/>;
    }
    return (

        <div>
            <h2 className="m-auto">New article</h2>
            <Form ref={form} onSubmit={handleAdd}>
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

                <select className="form-control" multiple={true} defaultValue={selectedTags} onChange={onChangeTags}>
                    {tags && tags.map((sTag, index) => (
                        <option key={index} value={sTag.title}>{sTag.title}</option>
                    ))}
                </select>
                <div className="form-group mt-2">
                    <label htmlFor="body">
                        <ReactQuill name="body" theme="snow" value={body} onChange={onChangeBody}/>
                    </label>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={submitted}>
                        {submitted && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Add article</span>
                    </button>
                </div>


                <CheckButton style={{display: "none"}} ref={checkBtn}/>
            </Form>
        </div>

    );
};

export default AddArticle;
