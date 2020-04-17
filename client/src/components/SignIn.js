import React from 'react';

import {login} from '../SessionManager.js';

const SignIn = (props) => {

    const onSubmit = (evt) => {

        evt.preventDefault();

        let form = document.getElementById("formLogin");
        login(form.email.value, form.password.value, props.views, props.setViews, props.userData, props.setUserData);
        
    }

    const onClick = (evt) => {

        props.setViews({signup: true});
        
    }

    return (
        <div>
            <form id="formLogin" onSubmit={onSubmit}>

                <div className="form-group row">
                    <div className="col col-12 col-sm-3">
                        <label htmlFor="email">Email: </label>
                    </div>
                    <div className="col col-12 col-sm-9">
                        <input className="form-control" name="email" id="email" type="email"/>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col col-12 col-sm-3">
                        <label htmlFor="password">Password: </label>
                    </div>
                    <div className="col col-12 col-sm-9">
                        <input className="form-control" name="password" id="password" type="password"/>
                    </div>
                </div>

                <input className="btn btn-primary" type="submit" value="Sign in"/>
            </form>
            <div>
                <br/>
                <p>Don't have an account?&nbsp;<a href="#" onClick = {onClick}>Sign up</a></p>
            </div>
   
        </div>
    );

}

export default SignIn;