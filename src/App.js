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
