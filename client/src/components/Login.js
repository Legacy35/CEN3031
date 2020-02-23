import React from 'react';
import axios from 'axios';
import './css/bootstrap.min.css';

const Login = (props) => {

    const login = async () => {
        let form = document.getElementById("formLogin");
        let email = form.email.value;
        let password = form.password.value;
        axios.get('/authenticate.php?email=' + email + '&password=' + password).then(
            (res) => {
               console.log(res.data)
            }
        )
        .catch((e) => {
            console.log(e.data);
        });
    }

    return (

        <div className="row">
            <div className="col col-xs-4 col-sm-4 col-md-4 col-lg-4" style={{outline: "1px solid black", margin: "0 auto"}}>
                <form id="formLogin">
                    <input name = "email" type="text" placeholder="Email address"></input>
                    <input name="password" type="password" placeholder="password"></input>
                </form>
                <button className="btn btn-primary" onClick={login}>Sign in</button>
            </div>
        </div>
    );

}

export default Login;