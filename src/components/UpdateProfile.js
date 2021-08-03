import React, {useRef, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {useDispatch, useSelector} from "react-redux";
import {getProfile, profileUpdate} from "../actions/auth";
import {Redirect} from "react-router-dom";

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
    const [image,setImage] = useState(null);
    const [alert, setAlert] = useState('');
    const {isLoggedIn} = useSelector(state => state.auth);
    const [sending, setSending] = useState(false);


    const onChangeNickname = (e) => {
        const nickname = e.target.value;
        setNickname(nickname);
    };
    const onChangeImage = (e) => {
        const image = e.target.files[0];
        setImage(image);
        console.log(image);
    }

    if (!isLoggedIn) {
        return <Redirect to="/login"/>;
    }

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('nickname', nickname)
        if (image !== null) {
            form_data.append('image', image, image.name);
        }
        setSending(true);
        dispatch(profileUpdate(props.profile.id,
                form_data,
            )
        ).then(() => {
            dispatch(getProfile(props.profile.id))
            setAlert('Your profile successfully updated');

        })
            .catch(e => {
                setAlert('Something go wrong. Try again please');
            })
    }


    return (

        <div>
            {alert !== '' && (
                <div className="alert alert-warning">
                {alert}
                </div>
            )}

            <Form ref={form} onSubmit={handleUpdateProfile}>


                <div className="form-group">
                    <Input
                        type="text"
                        className="form-control"
                        name="fistName"
                        value={nickname}
                        placeholder="Change nickname"
                        onChange={onChangeNickname}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Select image</label>
                    <Input type="file"
                           className="form-control-file"
                           id="image"
                           onChange={onChangeImage}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={sending}>
                        <span>Update</span>
                    </button>
                </div>



                <CheckButton style={{display: "none"}} ref={checkBtn}/>
            </Form>
        </div>

    );
};

export default UpdateProfile;
