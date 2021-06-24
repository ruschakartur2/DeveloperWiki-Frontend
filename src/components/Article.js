import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ArticleDataService from '../services/article.service';
import ReactHtmlParser from 'react-html-parser';


const Article = (props) => {
    const initialArticleState = {
        id: null,
        title: "",
        body: "",
        slug: "",
        created_at: "",
    };

    const [currentArticle, setCurrentArticle] = useState(initialArticleState);
    const [success, setSuccess] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const getArticle = id => {
        ArticleDataService.get(id)
            .then(response=>{
                setCurrentArticle(response.data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    useEffect(()=>{
        getArticle(props.match.params.id);
    },[props.match.params.id])


    return (
        <div className="container">
            <div className="well">
                <div className="row">
                    <div className="col-md-12">

                        <div className="">
                            <h1 className="hidden-xs hidden-sm">{currentArticle.title}</h1>
                            <hr/>
                                <small>{currentArticle.created_at}</small><br/>
                                <small><strong>{currentArticle.author && currentArticle.author.email}</strong></small>
                                <hr/>
                                    <p className="text-justify">
                                        {ReactHtmlParser (currentArticle.body)}
                                    </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Article;