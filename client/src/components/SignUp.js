import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const SignUp = (props) => {

    const signup = (evt) => {

        let form = document.getElementById("formSignUp");
        let email = form.email.value;
        let password = form.password.value;
        let passwordConfirm = form.passwordConfirm.value;

        axios.post('/apis/authenticate/authenticate.php', {
            email: email,
            password: password,
            passwordConfirm: passwordConfirm
        }).then(
            (res) => {
                console.log(res.data);
                if(res.data && res.data.token){
                    const cookies = new Cookies();
                    cookies.set('token', res.data.token);
                    alert("User session token is: " + cookies.get('token'));
                    props.displayUserInfo();
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

    return (
        <div className="row">
            <div className="form col col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <h2>Sign up</h2>
                <form id="formSignUp">
                    <input type="text" name="email" placeholder="email address"></input>
                    <input type="password" name="password" placeholder="password"></input>
                    <input type="password" name="passwordConfirm" placeholder="confirm password" onKeyPress={onKeyPress}></input>
                </form>
                <button className="btn btn-primary" onClick={signup}>Sign up</button>
            </div>
        </div>
    );

}

export default SignUp;