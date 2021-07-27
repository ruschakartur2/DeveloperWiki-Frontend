import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {getUserArticles} from "../actions/articles";
import {Link} from "react-router-dom";


const UserArticles = (props) => {
    const articles = useSelector(state => state.articles.items)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserArticles(props.author.id));
    }, [dispatch, props.author.id])
    return (
        <div className="pb-5 pt-5 ">
            <h2>User's articles</h2>
            <ul className="list-group">
                {articles && articles.length >= 1 ? articles.map((article, index) => (
                    <Link to={"/article/" + article.slug} key={index} className="list-group-item">{article.title}</Link>
                )) : (<h2> {props.author.email} haven't articles now </h2>)}
            </ul>
        </div>
    )
};

export default UserArticles;
