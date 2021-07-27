import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../actions/auth";
import {Redirect} from "react-router-dom";


const Profile = () => {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getProfile(user.id));
    },[dispatch, user.id])


  if (user.id) {
      return <Redirect to={"profile/"+user.id + '/'}/>
  }

  return (
      <div>
            Loading
      </div>
  );
};

export default Profile;
