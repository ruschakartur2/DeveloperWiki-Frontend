import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setCurrentPage, updateArticle} from '../actions/articles';
import ArticleDataService from '../services/article.service';

import ReactQuill from 'react-quill';
import Form from "react-validation/build/form";

const ArticleUpdate = (props) => {
    const initialArticleState = {
        id: null,
        title: "",
        tags: [],
        body: "",
        slug: "",
        previous_version: {

        }
    };
    const tags = useSelector(state => state.admin.tags);
    const [submitted, setSubmitted] = useState(false);
    const form = useRef();

    const [currentArticle, setCurrentArticle] = useState(initialArticleState);
    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');
    const [selectedTags, setSelectedTags] = useState([])
    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const getArticle = id => {
        ArticleDataService.get(id)
            .then(response=>{
                setCurrentArticle(response.data);
                setNewTitle(response.data.title);
                setNewBody(response.data.body);
                setSelectedTags(response.data.tags);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(()=>{
        getArticle(props.match.params.id);
    },[props.match.params.id, dispatch]);
    const success = 'Your article successful updated'
    const slug = currentArticle.slug
    const updateContent = () => {
       dispatch(updateArticle(currentArticle.slug, {
                                                'title': newTitle,
                                                'update_tags': selectedTags,
                                                'body': newBody })
            )
            .then(() => {
                setSubmitted(true);
                props.history.push({
                    pathname: '/articles',
                    state: {message: success,
                            slug: slug},
                })
            })
            .catch(e => {
                console.log(e);

            });
        dispatch(setCurrentPage(1))

    }

    const previousUpdate = () => {
        dispatch(updateArticle(currentArticle.slug, {
            'title': currentArticle.previous_version.title,
            'body': currentArticle.previous_version.body,
        }))
            .then(response => {
                console.log(response);
                props.history.push('/article/'+currentArticle.slug)
            })
            .catch(e => {
                console.log(e);

            })
        dispatch(setCurrentPage(1))

    }

    const handleTitleChange = e => {
        const title = e.target.value;
        setNewTitle(title);
    }

    const handleBodyChange = e => {
        setNewBody(e)
    }
    const handleTagsChange = (e) => {
            const tags = []
            let tag = e.target.value;
            tags.push(tag)
            console.log(selectedTags)
            setSelectedTags(tags);
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
                <h5 className="text-danger">{currentArticle.tags && currentArticle.tags.length>=1 ? currentArticle.tags.map((tag,key)=> (
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
                    <input type="text"
                           list="tags"
                           value={selectedTags}
                           required={true}
                           name="tags"
                           onChange={handleTagsChange}/>
                    <datalist id="tags">
                        {tags && tags.length>=1 && tags.map((sTag, index) => (
                            <option key={index} value={sTag.title}>{sTag.title}</option>
                        ))}
                    </datalist>
                    <div className="form-group mt-2">
                        <ReactQuill name="body"
                                    theme="snow"
                                    value={newBody}
                                    onChange={handleBodyChange}
                                    />
                    </div>
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