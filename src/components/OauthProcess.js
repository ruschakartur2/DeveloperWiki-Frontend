import React, {useEffect} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {useSelector} from "react-redux";


const OauthProcess = (props) => {
    const { isLoggedIn } = useSelector(state => state.auth);


    useEffect(()=>{
        const code =
            window.location.href.match(/\?code=(.*)/) &&
            window.location.href.match(/\?code=(.*)/)[1];
        console.log(code);
        if(code) {
            axios.post('http://127.0.0.1:8000/api/login/social/token_user/',{
                'provider':'github',
                'code': code,
            })
                .then((res)=>{
                    localStorage.setItem("user", JSON.stringify({id: res.data.id, email: res.data.email}));
                    localStorage.setItem("token", JSON.stringify(res.data.token));
                    localStorage.setItem("profile", JSON.stringify({id: res.data.id,
                        email: res.data.email,
                        nickname: res.data.nickname,
                        image: res.data.image}));
                    window.location.reload();
                })
        }
    })
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
