/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Router, Switch, Route, Link} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ArticlesList from "./components/ArticlesList";
import AddArticle from "./components/AddArticle";
import ArticleUpdate from "./components/UpdateArticle";
import Article from "./components/Article";

import {logout} from "./actions/auth";

import {history} from "./helpers/history";
import CommentTree from "./components/CommentTree";
import AddComment from "./components/AddComment";
import Tag from "./components/Tag";
import UsersProfile from "./components/UsersProfile";

const App = () => {

    const dispatch = useDispatch();
    const user = useSelector(state=>state.auth.user);

    const logOut = () => {
        dispatch(logout());
    };

    return (
        <Router history={history}>
            <div>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css"
                      integrity="sha256-aAr2Zpq8MZ+YA/D6JtRD3xtrwpEz2IqOS+pWD/7XKIw=" crossOrigin="anonymous"/>

                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.css"
                      integrity="sha512-xmGTNt20S0t62wHLmQec2DauG9T+owP9e6VU8GigI0anN7OXLip9i7IwEhelasml2osdxX71XcYm6BQunTQeQg=="
                      crossOrigin="anonymous"/>

                <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"/>

                <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/js/bootstrap.min.js"
    integrity="sha256-OFRAJNoaD8L3Br5lglV7VyLRf0itmoBzWUoM+Sji4/8="
    crossOrigin="anonymous"/>

                <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput.js"
    integrity="sha512-VvWznBcyBJK71YKEKDMpZ0pCVxjNuKwApp4zLF3ul+CiflQi6aIJR+aZCP/qWsoFBA28avL5T5HA+RE+zrGQYg=="
    crossOrigin="anonymous"/>

                <script
    src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-tagsinput/0.8.0/bootstrap-tagsinput-angular.min.js"
    integrity="sha512-KT0oYlhnDf0XQfjuCS/QIw4sjTHdkefv8rOJY5HHdNEZ6AmOh1DW/ZdSqpipe+2AEXym5D0khNu95Mtmw9VNKg=="
    crossOrigin="anonymous"/>


                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        DevWiki
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item"><Link to={"/articles"} className="nav-link">
                            Articles
                        </Link>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <Link to={"/add"} className="nav-link">
                                    Add article
                                </Link>
                            </li>)}
                      {user && (
                          <li className="nav-item">
                          <Link to={"/tags"} className="nav-link">Tags</Link>
                          </li>
                            )
                      }

                    </div>

                    {user ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={  {pathname: "/profile/" + user.id, state: {id: user.id}}}
                                      className="nav-link">{user.email}</Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/profile/:id" component={UsersProfile}/>
                        <Route exact path="/articles" component={ArticlesList}/>
                        <Route exact path="/add" component={AddArticle}/>
                        <Route exact path="/update/:id" component={ArticleUpdate}/>
                        <Route exact path="/article/:id" component={Article}/>
                        <Route exact path="/comment/:id" component={Comment}/>
                        <Route exact path="/comments" component={CommentTree}/>
                        <Route exact path="/comment/add" component={AddComment}/>
                        <Route exact path="/tags" component={Tag}/>

                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
