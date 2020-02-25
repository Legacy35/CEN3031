import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

/**
 * 
 * @param {*} props App.userInfo, App.setUserInfo, App.views, App.setViews
 */
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
                    
                    axios.get('/apis/authenticate/whois.php?token=' + cookies.get('token')).then(
                        (res) => {
                            if(res.data && !res.data.error){
                                props.setUserInfo({...props.userInfo, ...res.data});
                                props.setViews({...props.views, userInfo: true});
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

    return (
        <div className="container">
            <div>
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
        </div>
    );

}

export default SignUp;