import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../../actions/auth";
import UpdateProfile from "./UpdateProfile";
import UserArticles from "./UserArticles";
import {getUserArticles} from "../../../actions/articles";
import {Redirect} from "react-router-dom";


const UsersProfile = (props) => {
    const profile = useSelector(state => state.auth.profile);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const articles = useSelector(state => state.articles.items)
    const {isLoggedIn} = useSelector(state => state.auth);

    useEffect(()=>{
        dispatch(getProfile(props.match.params.id));
    },[dispatch, props.match.params.id])

    useEffect(() => {
        dispatch(getUserArticles(props.match.params.id,1));
    }, [dispatch, props.match.params.id])




    if (!isLoggedIn) {
        return <Redirect to="/login"/>;
    }

    return (
        <div>
            {!profile && (
                <div>
                <h2>Error</h2>
                <h3>
                    No internet connection
                </h3>
                </div>
            )}

            {profile && (

                <div className="container">
                    <header className="jumbotron">
                        <h2>
                            <strong className={profile.is_staff ? ('text-danger') : '' && profile.is_moder ? ('text-warning') : ''}>{profile.email}</strong> profile
                            <span className="ml-3">
                            {profile.is_staff ? (<div className="p-2 mr-1  badge badge-danger">A</div>) : ('')}
                            {profile.is_moder ? (<div className="p-2  badge badge-warning">M</div>) : ('')}
                            </span>
                            </h2>

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

                        </div>
                </div>
            )}
        </div>
    );
};

export default UsersProfile;
