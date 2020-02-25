import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Login = (props) => {

    const login = async () => {
        let form = document.getElementById("formLogin");
        let email = form.email.value;
        let password = form.password.value;
        axios.get('/apis/authenticate/authenticate.php?email=' + email + '&password=' + password).then(
            (res) => {
                console.log(res);
                if(res.data && res.data.token){
                    const cookies = new Cookies();
                    cookies.set('token', res.data.token);
                    alert("User session token is: " + cookies.get('token'));
                } else {
                    if(res.data && res.data.error) alert(res.data.error);
                }
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        );
    }

    const onKeyPress = (evt) => {
        if(evt.key === 'Enter'){
            login();
            props.displayUserInfo();
        }
    }

    return (

        <div className="row">
            <div className="form col col-xs-4 col-sm-4 col-md-4 col-xl-4 col-xl-4">
                <h2>Sign in</h2>
                    <form id="formLogin">
                        <input name = "email" type="text" placeholder="Email address"></input>
                        <input name="password" type="password" placeholder="password" onKeyPress={onKeyPress}></input>
                    </form>
                    <button className="btn btn-primary" onClick={login}>Sign in</button>
            </div>
        </div>
    );

}

export default Login;