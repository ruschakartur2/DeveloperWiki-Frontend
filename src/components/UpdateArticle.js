import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {updateArticle, deleteArticle} from '../actions/articles';
import ArticleDataService from '../services/article.service';

const Article = (props) => {


    const [currentArticle, setCurrentArticle] = useState({});
    const dispatch = useDispatch();

    const [newTitle,setNewTitle] = useState(currentArticle.title);
    const [newBody, setNewBody] = useState(currentArticle.body);

    const handleNewTitleChange = e => {
        const newTitle = e.target.value;
        setNewTitle(newTitle)
    };

    const handleNewBodyChange = e => {
        const newBody = e.target.value;
        setNewBody(newBody);
    };

    const getTutorial = id => {
        ArticleDataService.get(id)
            .then(response=>{
                setCurrentArticle(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    };

    useEffect(()=>{
        getTutorial(props.match.params.id);
    },[props.match.params.id]);


    const updateContent = () => {
        dispatch(updateArticle(currentArticle.id, {
            'title': newTitle,
            'body': newBody,
            'author': currentArticle.author
        }))
            .then(response => {
                console.log(response);

            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>

                <div className="edit-form">
                    <h4>Tutorial</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={newTitle}
                                onChange={handleNewTitleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Text</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={newBody}
                                onChange={handleNewBodyChange}
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
                </div>
        </div>
    )

}

export default Article;
