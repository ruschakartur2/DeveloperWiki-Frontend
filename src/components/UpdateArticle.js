import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {updateArticle, deleteArticle} from '../actions/articles';
import ArticleDataService from '../services/article.service';

import ReactQuill from 'react-quill';

const ArticleUpdate = (props) => {
    const initialArticleState = {
        id: null,
        title: "",
        body: "",
        slug: "",
    };

    const [currentArticle, setCurrentArticle] = useState(initialArticleState);
    const [success, setSuccess] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newBody, setNewBody] = useState('');

    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const getTutorial = id => {
        ArticleDataService.get(id)
            .then(response=>{
                setCurrentArticle(response.data);
                console.log(response.data);
                setNewTitle(response.data.title);
                setNewBody(response.data.body);

            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(()=>{
        getTutorial(props.match.params.id);
        console.log();
    },[props.match.params.id])

    const updateContent = () => {
       dispatch(updateArticle(currentArticle.slug, {
                                                'title': newTitle,
                                                'body': newBody })
            )
            .then(response => {
                console.log(response);
                setSuccess(true);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const previousUpdate = () => {
        dispatch(updateArticle(currentArticle.slug, {
            'title': currentArticle.previous_version.title,
            'body': currentArticle.previous_version.body,
        }))
            .then(response => {
                console.log(response);
                setSuccess(true);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const handleTitleChange = e => {
        const title = e.target.value;
        setNewTitle(title);
    }

    const handleBodyChange = e => {
        setNewBody(e)
    }
    if (currentArticle.author) {
        if (currentArticle.author.id != currentUser.id) {
            props.history.push('/articles')
        }
    }
    return (
        <div>

            <div className="edit-form">
                <h4>Article</h4>
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

                    <div className="form-group">
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