import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Form from './generic/Form.js';

import {login} from '../SessionManager.js';

const SignIn = (props) => {

    const onSubmit = () => {
        let form = document.getElementById("formLogin");
        login(form.email.value, form.password.value, props.views, props.setViews, props.setUserData);
        
    }

    let inputs = [
        {
            name: "email",
            label: "Email:",
            placeholder: "ceo@business.net"
        },
        {
            name: "password",
            label: "Password:",
            placeholder: "AllWorkAndNoPlayMakesJohhnyADullBoy",
            type: "password"
        }
    ];

    return <Form id={"formLogin"} labelColWidth={[12, 3, 3, 3, 3]} inputColWidth={[12, 9, 9, 9, 9]} onSubmit={onSubmit} inputs={inputs}/>;

}

export default SignIn;