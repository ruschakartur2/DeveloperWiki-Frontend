import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import {createArticle, setCurrentPage} from "../actions/articles";
import {Redirect} from 'react-router-dom';
import {retrieveTags} from "../actions/tags";

import TagsInput from 'react-tagsinput'

import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.


const AddArticle = (props) => {

    const {user: currentUser} = useSelector((state) => state.auth);
    const {isLoggedIn} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const checkBtn = useRef();
    const form = useRef();
    const [body, setBody] = useState("");
    const [title, setTitle] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [selectedTags, setSelectedTags] = useState([])
    const [message, setMessage] = useState('');
    const validateTitle = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required!
                </div>
            );
        }
    }

    const onChangeTitle = (e) => {
        let title = e.target.value;
        title = title.replace(/[^A-Za-zwА-Яа-яІЄЇ ]+/ig, '')
        setTitle(title);
    };
    const onChangeBody = (e) => {
        const body = e;
        setBody(body);
    };

    useEffect(() => {
        dispatch(retrieveTags());
    }, [dispatch]);

    const handleAdd = (e) => {
        e.preventDefault();
        console.log(selectedTags);
        console.log(currentUser.id)
        if (selectedTags.length >= 1 && title.length >= 1 && body.length >= 1) {
            dispatch(createArticle(title, selectedTags, body.toString(), currentUser.id))
                .then((data) => {
                    setSubmitted(true);
                    dispatch(setCurrentPage(1))
                    props.history.push('/articles')
                    console.log(data);
                }).catch(e => {
                if(e && e.response && e.response.data.title[0]) {
                    setMessage('Article with current title exist, try another please');
                }
                setMessage(e.message);
            })
        } else {
            setMessage('Write all fields please');
        }

    };
    if (!isLoggedIn) {
        return <Redirect to="/login"/>;
    }

    // tag system test functions


    return (

        <div>
            <h2 className="m-auto">New article</h2>
            <Form ref={form} onSubmit={handleAdd}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={title}
                        required={true}
                        onChange={onChangeTitle}
                        validations={[validateTitle]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Tags</label>
                <TagsInput
                            name="tags"
                           value={selectedTags}
                           onChange={(e) => {setSelectedTags(e)}}
                           required={true}
                           onlyUnique={true}
                           addOnBlur={true}/>
                </div>


                <div className="form-group mt-2">
                    <label htmlFor="body">Text</label>
                        <ReactQuill required={true}
                                    name="body"
                                    theme="snow"
                                    value={body}
                                    onChange={onChangeBody}/>

                </div>
                {message && (<div className="alert alert-danger"><b>* {message}</b></div>
                )}
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
