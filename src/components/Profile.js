import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.email}</strong> profile
        </h3>
          {currentUser.is_active ?
              (<h5 className="online"> Online</h5>)
              : (<h5 className="offline">Offline</h5>)
          }
      </header>
        

    </div>
  );
};

export default Profile;
