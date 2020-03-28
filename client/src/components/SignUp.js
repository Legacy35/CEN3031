import React from 'react';
import axios from 'axios';
import {login} from '../SessionManager.js';

const SignUp = (props) => {

    const onSubmit = (evt) => {

        evt.preventDefault();

        let form = document.getElementById("formSignUp");

        axios.post('/apis/authenticate/authenticate.php', {
            email: form.email.value,
            password: form.password.value,
            passwordConfirm: form.passwordConfirm.value
        }).then(
            (res) => {
                if (res.data && res.data.token) {
                    login(form.email.value, form.password.value, props.views, props.setViews, props.setUserData);

                } else {
                    if (res.data.error) alert(res.data.error);
                }
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );

    }

    return (
        <div>
            <form id="formSignUp" onSubmit={onSubmit}>

                <div className="form-group row">
                    <div className="col col-12 col-sm-3">
                        <label htmlFor="email">Email: </label>
                    </div>
                    <div className="col col-12 col-sm-9">
                        <input className="form-control" name="email" id="email" type="email" />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col col-12 col-sm-3">
                        <label htmlFor="password">Password: </label>
                    </div>
                    <div className="col col-12 col-sm-9">
                        <input className="form-control" name="password" id="password" type="password" />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col col-12 col-sm-3">
                        <label htmlFor="passwordConfirm">Confirm password: </label>
                    </div>
                    <div className="col col-12 col-sm-9">
                        <input className="form-control" name="passwordConfirm" id="passwordConfirm" type="password" />
                    </div>
                </div>

                <input type="submit" value="Sign up" className="btn btn-primary"/>
            </form>
        </div>
    );

}

export default SignUp;