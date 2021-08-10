import React from "react";
import {useSelector} from "react-redux";
import {Link, Redirect} from "react-router-dom";



const AdminHome = () => {

    const user = useSelector(state => state.auth.user)
    const {isLoggedIn} = useSelector(state => state.auth);

    if (!isLoggedIn) {
        return <Redirect to="/login"/>;
    }
    if (!user) {
        return <Redirect to="/login"/>
    }
    if (!user.is_staff) {
        return <Redirect to="/profile"/>
    }

    return (
        <div>
            <h1 className="text-center p-4">
            Welcome <b>{user.email}</b> in admin panel
            </h1>
            <ul className="list-inline text-center m5 p-3">
                <Link to="/admin/users" className="list-inline-item alert alert-warning">Manage <b>Users</b></Link>
                <button className="list-inline-item alert alert-warning">Manage <b>Articles</b></button>
                <button className="list-inline-item alert alert-warning">Manage <b>Comments</b></button>
            </ul>
        </div>
    );
};

export default AdminHome;
