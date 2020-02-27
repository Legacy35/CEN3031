import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

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

    return (

        <div className="tile view">
            <h2>Sign up</h2>
            <form id="formSignUp">
                <input type="text" name="email" placeholder="email address"></input>
                <input type="password" name="password" placeholder="password"></input>
                <input type="password" name="passwordConfirm" placeholder="confirm password" onKeyPress={onKeyPress}></input>
            </form>
            <button className="btn btn-primary" onClick={signup}>Sign up</button>
        </div>
    );

}

export default SignUp;