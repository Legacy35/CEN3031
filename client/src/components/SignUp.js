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
            passwordConfirm: form.passwordConfirm.value,
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            address: form.address.value,
            phoneNumber: form.phoneNumber.value,
            insuranceCompany: form.insuranceCompany.value,
            dashCam: form.dashCam.value 
        }).then(
            (res) => {
                if (res.data && res.data.token) {
                    login(form.email.value, form.password.value, props.views, props.setViews, props.userData, props.setUserData);

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

/**
 * insurance company, boolean hasDashCam
 */

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

                <div className="form-group row">
                    <div className="col col-12 col-sm-3">
                        <label htmlFor="firstName">First name: </label>
                    </div>
                    <div className="col col-12 col-sm-9">
                        <input className="form-control" name="firstName" id="firstName" type="text" />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col col-12 col-sm-3">
                        <label htmlFor="lastName">Last name: </label>
                    </div>
                    <div className="col col-12 col-sm-9">
                        <input className="form-control" name="lastName" id="lastName" type="text" />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col col-12 col-sm-3">
                        <label htmlFor="address">Address: </label>
                    </div>
                    <div className="col col-12 col-sm-9">
                        <input className="form-control" name="address" id="address" type="text" />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col col-12 col-sm-3">
                        <label htmlFor="phoneNumber">Phone number: </label>
                    </div>
                    <div className="col col-12 col-sm-9">
                        <input className="form-control" name="phoneNumber" id="phoneNumber" type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col col-12 col-sm-3">
                        <label htmlFor="insuranceCompany">Name of your insurance company: </label>
                    </div>
                    <div className="col col-12 col-sm-9">
                        <input className="form-control" name="insuranceCompany" id="insuranceCompany" type="text"/>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col col-12 col-sm-3">
                        <label htmlFor="dashCam">Do you have a dash cam in your car?</label>
                    </div>
                    <div className="col col-12 col-sm-9">
                        <select className="form-control" name="dashCam" id="dashCam">
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                </div>


                <input type="submit" value="Sign up" className="btn btn-primary"/>
            </form>
        </div>
    );

}

export default SignUp;
