import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {updateArticle, deleteArticle} from '../actions/articles';
import ArticleDataService from '../services/article.service';

const Article = (props) => {

    const initialArticleState = {
        id: null,
        title: "",
        body: "",

    };

    const [currentArticle, setCurrentArticle] = useState(initialArticleState);
    const dispatch = useDispatch();

    const getTutorial = id => {
        ArticleDataService.get(id)
            .then(response=>{
                setCurrentArticle(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(()=>{
        getTutorial(props.match.params.id);
    },[props.match.params.id])

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentArticle({ ...currentArticle, [name]: value });
    };

    const updateContent = () => {
        dispatch(updateArticle(currentArticle.id, currentArticle))
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
                                value={currentArticle.title}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Text</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentArticle.body}
                                onChange={handleInputChange}
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