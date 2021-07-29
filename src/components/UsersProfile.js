import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../actions/auth";
import UpdateProfile from "./UpdateProfile";
import UserArticles from "./UserArticles";
import {getUserArticles, retrieveMoreUserArticles} from "../actions/articles";
import {Waypoint} from "react-waypoint";


const UsersProfile = (props) => {
    const profile = useSelector(state => state.auth.profile);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const articles = useSelector(state => state.articles.items)
    const [loadedAll, setLoadedAll] = useState(false);
    const [userArticlesPage, setUserArticlesPage] = useState(1);
    useEffect(()=>{
        dispatch(getProfile(props.match.params.id));
    },[dispatch, props.match.params.id])

    useEffect(() => {
        dispatch(getUserArticles(props.match.params.id,userArticlesPage));
    }, [dispatch, props.match.params.id, userArticlesPage])


    const nextPage = () => {
        dispatch(retrieveMoreUserArticles(props.match.params.id,2)).then((res) => {
            setUserArticlesPage(userArticlesPage + 1)
            if (res === undefined) {
                setLoadedAll(true);
            }
        })
            .catch((err) => {
                setLoadedAll(true);
            })
    }


    return (
        <div>
            {profile && (

                <div className="container">
                    <header className="jumbotron">
                        <h3>
                            <strong>{profile.email}</strong> profile
                        </h3>
                        <h5>
                            {profile.nickname}
                        </h5>
                        {profile.is_active ?
                            (<h5 className="online"> Online</h5>)
                            : (<h5 className="offline">Offline</h5>)
                        }

                        <img src={profile.image} alt="User avatar" className="rounded-circle" width="150px" height="150px"/>


                    </header>
                    {user.id === profile.id && (
                        <UpdateProfile profile={profile}/>
                    )}
                    <div className="Articles">
                         <UserArticles author={profile} articles={articles}/>
                        <hr/>
                        {articles.length >= 10 && !loadedAll ? (
                            <Waypoint onEnter={nextPage}/>
                        ) : <div/>}
                        </div>
                </div>
            )}
        </div>
    );
};

export default UsersProfile;
