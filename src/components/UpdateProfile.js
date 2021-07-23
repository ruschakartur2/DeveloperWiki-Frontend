import React, {useRef, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {useDispatch} from "react-redux";
import {getProfile, profileUpdate} from "../actions/auth";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const UpdateProfile = (props) => {

    const checkBtn = useRef();
    const form = useRef();
    const dispatch = useDispatch()
    const [nickname, setNickname] = useState(props.profile.nickname);
    const [email, setEmail] = useState(props.profile.email);

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangeNickname = (e) => {
        const nickname = e.target.value;
        setNickname(nickname);
    };


    const handleUpdateProfile = (e) => {
        e.preventDefault();
        dispatch(profileUpdate(props.profile.id,
            {
                'email': email,
                'nickname': nickname
            })
        ).then(() => {
            dispatch(getProfile(props.profile.id))
        })
    }


    return (

        <div>
            <Form ref={form} onSubmit={handleUpdateProfile}>
                <div className="form-group">
                    <Input
                        type="email"
                        className="form-control"
                        name="fistName"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <Input
                        type="text"
                        className="form-control"
                        name="fistName"
                        value={nickname}
                        placeholder="set nickname"
                        onChange={onChangeNickname}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block">
                        <span>Update</span>
                    </button>
                </div>


                <CheckButton style={{display: "none"}} ref={checkBtn}/>
            </Form>
        </div>

    );
};

export default UpdateProfile;
