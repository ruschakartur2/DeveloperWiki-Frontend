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
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>

      <p>
        <strong>Here from:</strong> {currentUser.date_joined}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>

    </div>
  );
};

export default Profile;
