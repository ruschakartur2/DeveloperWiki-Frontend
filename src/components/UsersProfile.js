import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../actions/auth";


const UsersProfile = (props) => {
    const profile = useSelector(state => state.auth.profile);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProfile(props.location.state.id));
    },[dispatch, props.location.state.id])

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

                        <img src={profile.image ? ("http://127.0.0.1:8000"+profile.image) : ("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F352477108322644529%2F&psig=AOvVaw1QBGj5DDHEVw0YHyGvRmq4&ust=1627045855806000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCOj996Xg9vECFQAAAAAdAAAAABAD")} alt="" className="rounded-circle" width="150px" height="150px"/>

                    </header>

                </div>
            )}
        </div>
    );
};

export default UsersProfile;
