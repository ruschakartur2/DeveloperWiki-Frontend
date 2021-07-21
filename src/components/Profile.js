import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";


const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }


  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.email}</strong> profile
        </h3>
        <h5>
         <p> <i>{currentUser.first_name}</i> <span>{currentUser.last_name}</span></p>
         <p> <u>{currentUser.city}</u></p>
          <b>{currentUser.phone}</b>
        </h5>
          {currentUser.is_active ?
              (<h5 className="online"> Online</h5>)
              : (<h5 className="offline">Offline</h5>)
          }
          <img src={"http://127.0.0.1:8000"+currentUser.image} alt="" className="rounded-circle" width="150px" height="150px"/>
      </header>
        <UpdateProfile email={currentUser.email}
                       firstName={currentUser.first_name}
                       lastName={currentUser.last_name}
                       phone={currentUser.phone}
                       city={currentUser.city}/>

    </div>
  );
};

export default Profile;
