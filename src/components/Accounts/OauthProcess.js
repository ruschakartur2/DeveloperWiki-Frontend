import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {githubLogin} from "../../actions/auth";


const OauthProcess = (props) => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const code =
            window.location.href.match(/\?code=(.*)/) &&
            window.location.href.match(/\?code=(.*)/)[1];
            console.log(code);
            if (code && !loading) {
                dispatch(githubLogin(code))
                    .then(() => {
                        props.history.push('/profile');
                        setLoading(true);
                    })
            }

    },[dispatch, loading, props.history])
    if (isLoggedIn) {
        return <Redirect to={"/profile"}  />;
    }
    return (
        <div>
            Proccess...
        </div>
    );
};

export default OauthProcess;
