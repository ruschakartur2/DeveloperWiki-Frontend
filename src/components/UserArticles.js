import React, {useState} from "react";

import {Link} from "react-router-dom";
import {retrieveMoreUserArticles} from "../actions/articles";
import {useDispatch} from "react-redux";
import {Waypoint} from "react-waypoint";



const UserArticles = (props) => {
    const dispatch = useDispatch();
    const [userArticlesPage, setUserArticlesPage] = useState(1);
    const [loadedAll, setLoadedAll] = useState(false);

    const nextPage = () => {
        dispatch(retrieveMoreUserArticles(props.author.id,userArticlesPage+1)).then((res) => {
            setUserArticlesPage(userArticlesPage + 1)
            console.log(res)
            if (res === undefined) {
                setLoadedAll(true);
            }
        })
            .catch((err) => {
                setLoadedAll(true);
            })
    }


    return (
        <div className="pb-5 pt-5 ">
            <h2>User's articles</h2>
            <ul className="list-group">
                {props.articles && props.articles.length >= 1 ? props.articles.map((article, index) => (
                    <div key={index}>
                    <Link to={"/article/" + article.slug} key={index} className="list-group-item">{article.title}</Link>

                    </div>
                )) : (<h2> {props.author.email} haven't articles now </h2>)
                }
            </ul>
            {props.articles.length >= 10 && !loadedAll ? (
                <Waypoint onEnter={nextPage}/>
            ) : <div/>}
        </div>
    )
};

export default UserArticles;
