import React, {useRef, useState} from 'react';
import 'react-quill/dist/quill.snow.css';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

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

    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [email, setEmail] = useState(props.email);
    const [phone, setPhone] = useState(props.phone);
    const [city, setCity] = useState(props.city);

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangeFirstName = (e) => {
        const firstName = e.target.value;
        setFirstName(firstName);
    };
    const onChangeLastName = (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
    };
    const onChangePhone = (e) => {
        const phone = e.target.value;
        setPhone(phone);
    };
    const onChangeCity = (e) => {
        const city = e.target.value;
        setCity(city);
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();

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
                        value={firstName}
                        onChange={onChangeFirstName}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <Input
                        type="text"
                        className="form-control"
                        name="fistName"
                        value={lastName}
                        onChange={onChangeLastName}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <Input
                        type="text"
                        className="form-control"
                        name="fistName"
                        value={phone}
                        onChange={onChangePhone}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <Input
                        type="text"
                        className="form-control"
                        name="fistName"
                        value={city}
                        onChange={onChangeCity}
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
