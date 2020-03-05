import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

import Form from './generic/Form';

const SignUp = (props) => {

    const signup = (evt) => {

        let form = document.getElementById("formSignUp");        

        axios.post('/apis/authenticate/authenticate.php', {
            email: form.email.value,
            password: form.password.value,
            passwordConfirm: form.passwordConfirm.value
        }).then(
            (res) => {
                if(res.data && res.data.token){
                    const cookies = new Cookies();
                    cookies.set('token', res.data.token);
                    props.setToken(res.data.token);
                    axios.get('/apis/authenticate/whois.php?token=' + cookies.get('token')).then(
                        (res) => {
                            if(res.data && !res.data.error){
                                props.setUserData({...props.userData, ...res.data});
                                
                                let newViews = {...props.views};
                                newViews.userProfile = true;
                                newViews.signup = false;
                                props.setViews(newViews);
                            } else if (res.data.error){
                                alert(res.data.error);
                            }
                        }
                    ).catch(
                        (err) => {
                            console.log(err);
                        }
                    );

                } else {
                    if(res.data.error) alert(res.data.error);
                }
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );

    }

    const onKeyPress = (evt) => {
        if(evt.key === 'Enter'){
            signup();
        }
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
        },
        {
            name: "passwordConfirm",
            label: "Confirm password:",
            placeholder: "AllWorkAndNoPlayMakesJohhnyADullBoy",
            type: "password"
        }
    ];

    return <Form id={"formSignUp"} labelColWidth={3} inputColWidth={9} onSubmit={signup} inputs={inputs}/>;

}

export default SignUp;