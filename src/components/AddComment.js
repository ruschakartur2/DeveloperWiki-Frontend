import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import 'react-quill/dist/quill.snow.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {createComment, retrieveComments} from "../actions/comments";
import {Redirect} from 'react-router-dom';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const AddComment = (props) => {
    const {isLoggedIn} = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const checkBtn = useRef();
    const form = useRef();

    const [content, setContent] = useState("");


    const onChangeContent = (e) => {
        const content = e.target.value;
        setContent(content);
    };

    const handleAddComment = (e) => {
        console.log(props);
        e.preventDefault();
        if (props.parent == null) {
        dispatch(createComment(props.article.id, content, props.parent))
            .then(() => {
                console.log(props);
                dispatch(retrieveComments(props.article, 1))
                setContent(' ');
            }).catch(e => {
            console.log(e);
        })
        }
    };
    if (!isLoggedIn) {
        return <Redirect to="/login"/>;
    }
    return (

        <div>
            <Form ref={form} onSubmit={handleAddComment}>
                <div className="form-group">
                    <label htmlFor="content">Text</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="content"
                        value={content}
                        onChange={onChangeContent}
                        validations={[required]}
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-block">
                        <span>Comment</span>
                    </button>
                </div>


                <CheckButton style={{display: "none"}} ref={checkBtn}/>
            </Form>
        </div>

    );
};

export default AddComment;
