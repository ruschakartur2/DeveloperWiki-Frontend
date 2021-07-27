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
    const [nickname, setNickname] = useState(null);
    const [image,setImage] = useState(null);


    const onChangeNickname = (e) => {
        const nickname = e.target.value;
        setNickname(nickname);
    };
    const onChangeImage = (e) => {
        const image = e.target.files[0];
        setImage(image);
        console.log(image);
    }


    const handleUpdateProfile = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('nickname', nickname)
        if (image !== null) {
            form_data.append('image', image, image.name);
        }

        dispatch(profileUpdate(props.profile.id,
                form_data,
            )
        ).then(() => {
            dispatch(getProfile(props.profile.id))
        })
    }


    return (

        <div>
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
