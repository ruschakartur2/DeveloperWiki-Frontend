import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import {githubLogin, login} from "../actions/auth";

import LoginGithub from "react-login-github";
import axios from "axios";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password))
        .then((res) => {
          console.log(res);
          props.history.push('profile'+res.user.id + '/');
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to={"/profile"}  />;
  }


  const cors_demo_server = 'https://thingproxy.freeboard.io/fetch/';

  const reqToGithub = () => {
    return axios.get('https://github.com/login/oauth/authorize/?client_id=f64304f6601dbf74431b', {
      headers: {
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Max-Age": "3600",
        "Access-Control-Allow-Headers":"authorization, content-type, xsrf-token",
        "Access-Control-Expose-Headers": "xsrf-token",
      }
    })
  }

  const onSuccess = response => {

    return axios.post(cors_demo_server+'https://github.com/login/oauth/access_token', {

      "client_id": "f64304f6601dbf74431b",
      "client_secret": "d36f978f5e8fba938744ee5e844480b2c2033059",
      "code": response.code,
      "redirect_uri": "http://localhost:3000/login",
    }, {
      headers: {
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Max-Age": "3600",
        "Access-Control-Allow-Headers":"authorization, content-type, xsrf-token",
        "Access-Control-Expose-Headers": "xsrf-token",
      }
    }).then(res => {
        console.log(res.data.access_token)
        if(res && res.data && res.data.access_token) {
         dispatch(githubLogin(res.data.access_token))
        }
    })

  };
  const onFailure = error => {
    console.error(error)
  };
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h2 className="m-auto">Login</h2>

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>

        <span onClick={reqToGithub}>Send Github</span>

        <LoginGithub clientId="f64304f6601dbf74431b"
                     onSuccess={onSuccess}
                     onFailure={onFailure}/></div>
    </div>
  );
};

export default Login;
