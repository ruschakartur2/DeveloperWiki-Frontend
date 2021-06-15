import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {updateArticle, deleteArticle} from '../actions/articles';
import ArticleDataService from '../services/article.service';



import ReactQuill from 'react-quill';


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
    const handleBodyChange = (event) => {
        setCurrentArticle({ ...currentArticle, body: event });
        console.log({...currentArticle})
        console.log(event)
    }
    const handleInputChange = event => {
        setCurrentArticle({ ...currentArticle, title: event.target.value });
        console.log({...currentArticle})
    };




    const updateContent = () => {

        dispatch(updateArticle(currentArticle.id, {
                                                'title': currentArticle.title,
                                                'body': currentArticle.body }))
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
                        <ReactQuill name="body"
                                    theme="snow"
                                    value={currentArticle.body}
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
            </div>
        </div>
    )

}

export default Article;