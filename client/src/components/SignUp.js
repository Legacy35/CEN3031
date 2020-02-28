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
        <div>
            <form id="formSignUp">
                <h2>Sign up</h2>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" placeholder="Enter email" />
                    <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordConfirm">Confirm password</label>
                    <input name="passwordConfirm" type="password" onKeyPress={onKeyPress} className="form-control" placeholder="Enter password again" />
                </div>
            </form>
            <button className="btn btn-primary" onClick={signup}>Submit</button>
        </div>
    );

}

export default SignUp;