import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setCurrentPage, updateArticle} from '../actions/articles';
import ArticleDataService from '../services/article.service';

import ReactQuill from 'react-quill';
import Form from "react-validation/build/form";
import TagsInput from "react-tagsinput";

const ArticleUpdate = (props) => {
    const initialArticleState = {
        id: null,
        title: "",
        tags: [],
        body: "",
        slug: "",
        previous_version: {}
    };
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState('');

    const form = useRef();


    const [currentArticle, setCurrentArticle] = useState(initialArticleState);

    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');
    const [selectedTags, setSelectedTags] = useState([])
    const {user: currentUser} = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const updated = 'Your article successful updated'
    const slug = currentArticle.slug

    const getArticle = id => {
        ArticleDataService.get(id)
            .then(response => {
                setCurrentArticle(response.data);
                setNewTitle(response.data.title);
                setNewBody(response.data.body);
                setSelectedTags(response.data.tags);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(() => {
        getArticle(props.match.params.id);
    }, [props.match.params.id, dispatch]);

    const updateContent = () => {
        setSubmitted(true);
        dispatch(updateArticle(currentArticle.slug, {
                'title': newTitle,
                'update_tags': selectedTags,
                'body': newBody
            })
        )
            .then(() => {
                props.history.push({
                    pathname: '/articles',
                    state: {
                        message: updated,
                        slug: slug,
                        type: 'updated',
                    },
                })
            })
            .catch(e => {
                console.log(e);

            });
        dispatch(setCurrentPage(1))

    }

    const previousUpdate = () => {
        setSubmitted(true);
        dispatch(updateArticle(currentArticle.slug, {
            'title': currentArticle.previous_version.title,
            'body': currentArticle.previous_version.body,
            'update_tags': currentArticle.tags,
        }))
            .then(() => {
                props.history.push({
                    pathname: '/articles',
                    state: {
                        message: updated,
                        slug: slug,
                        type: 'updated',
                    },
                })
            }).catch(e => {
            if (e && e.response && e.response.data.title[0]) {
                setMessage('Article with current title exist, try another please');
            }
            setMessage(e.message);
            });
        dispatch(setCurrentPage(1))

    }

    const handleTitleChange = e => {
        let title = e.target.value;
        title = title.replace(/[^A-Za-zwА-Яа-яІЄЇ ]+/ig, '')
        setNewTitle(title);
    }

    const handleBodyChange = e => {
        setNewBody(e)
    }

    if (!currentUser) {
        props.history.push('/articles')

    }
    if (currentArticle.author) {
        if (currentArticle.author.id !== currentUser.id) {
            props.history.push('/articles')

        }
    }
    return (
        <div>

            <div className="edit-form">
                <h4>Article</h4>
                <h5 className="text-danger">{currentArticle.tags && currentArticle.tags.length >= 1 ? currentArticle.tags.map((tag, key) => (
                    <span key={key} className="badge badge-dark mr-3">{tag}</span>
                )) : (<span className="badge badge-dark">Without tag</span>)}</h5>
                <Form ref={form} onSubmit={updateContent}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required={true}
                            name="title"
                            value={newTitle}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <label htmlFor="tags">Tags</label>
                    <TagsInput name="tags"
                               value={selectedTags}
                               onChange={(e) => {
                                   setSelectedTags(e)
                               }}
                               required={true}
                               onlyUnique={true}
                               addOnBlur={true}/>

                    <div className="form-group mt-2">
                        <ReactQuill name="body"
                                    theme="snow"
                                    value={newBody}
                                    onChange={handleBodyChange}
                        />
                    </div>
                    {message && (<div className="alert alert-danger"><b>* {message}</b></div>
                    )}
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={submitted}>
                            {submitted && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Update article</span>
                        </button>
                    </div>
                </Form>

                {currentArticle &&
                <button
                    type="submit"
                    onClick={previousUpdate}>
                    Back to previous version
                </button>
                }

            </div>
        </div>
    )

}

export default ArticleUpdate;