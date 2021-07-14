import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setCurrentPage, updateArticle} from '../actions/articles';
import ArticleDataService from '../services/article.service';

import ReactQuill from 'react-quill';
import {retrieveTags} from "../actions/tags";

const ArticleUpdate = (props) => {
    const initialArticleState = {
        id: null,
        title: "",
        tags: [],
        body: "",
        slug: "",
        previous_version: {
            id: null,
            title: "",
            tags: [],
            body: "",
            slug: ""
        }
    };
    const tags = useSelector(state => state.admin.tags);

    const [currentArticle, setCurrentArticle] = useState(initialArticleState);
    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');
    const [selectedTags, setSelectedTags] = useState([])
    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const getTutorial = id => {
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
        getTutorial(props.match.params.id);
        dispatch(retrieveTags());
    },[props.match.params.id, dispatch]);

    const updateContent = () => {
       dispatch(updateArticle(currentArticle.slug, {
                                                'title': newTitle,
                                                'tags': selectedTags,
                                                'body': newBody })
            )
            .then(response => {

                props.history.push('/article/'+currentArticle.slug)
                })
            .catch(e => {
                console.log(e);

            });
        dispatch(setCurrentPage(1))

    }

    const previousUpdate = () => {
        dispatch(updateArticle(currentArticle.slug, {
            'title': currentArticle.previous_version.title,
            'tags': currentArticle.previous_version.tags,
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
        let tags = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedTags(tags)
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
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={newTitle}
                            onChange={handleTitleChange}
                        />
                    </div>

                    <select className="form-control" multiple={true} defaultValue={selectedTags} onChange={handleTagsChange}>
                        {tags && tags.length>=1 && tags.map((sTag, index) => (
                            <option key={index} value={sTag.title}>{sTag.title}</option>
                        ))}
                    </select>
                    <div className="form-group mt-2">
                        <ReactQuill name="body"
                                    theme="snow"
                                    value={newBody}
                                    onChange={handleBodyChange}
                                    />
                    </div>
                </form>
                <button
                    type="submit"
                    className="badge badge-success"
                    onClick={updateContent}
                >
                    Update
                </button>
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