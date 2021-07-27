import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../actions/auth";
import UpdateProfile from "./UpdateProfile";


const UsersProfile = (props) => {
    const profile = useSelector(state => state.auth.profile);
    const user = useSelector(state => state.auth.user);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProfile(props.match.params.id));
    },[dispatch, props.match.params.id])

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

                        <img src={profile.image} alt="" className="rounded-circle" width="150px" height="150px"/>

                    </header>
                    {user.id === profile.id && (
                        <UpdateProfile profile={profile}/>
                    )}

                </div>
            )}
        </div>
    );
};

export default UsersProfile;
