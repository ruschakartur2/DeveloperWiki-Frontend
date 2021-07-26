import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import UpdateProfile from "./UpdateProfile";
import {getProfile} from "../actions/auth";


const Profile = () => {
    const profile = useSelector(state => state.auth.profile);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProfile(user.id));
    },[dispatch, user.id])

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

          <img src={profile.image} width="150px" height="150px" alt="Avatar"/>

      </header>
        <UpdateProfile profile={profile}/>

    </div>
            )}
      </div>
  );
};

export default Profile;
