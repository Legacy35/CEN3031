import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const SignIn = (props) => {


    const hideAll = () => {
        let keys = Object.keys(props.views);
        let views = {...props.views};
        for(let i = 0; i < keys.length; i++){
          views[keys[i]] = false;
        }
        return views;
      }

    const login = () => {
        let form = document.getElementById("formLogin");
        axios.get('/apis/authenticate/authenticate.php?email=' + form.email.value + '&password=' + form.password.value).then(
            (res) => {
                if(res.data && res.data.token){
                    const cookies = new Cookies();
                    cookies.set('token', res.data.token);
                    props.setToken(res.data.token); 
                    props.setViews({...hideAll(), userProfile: true});
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
        }
    }

    return (
        <div>
            <h2>Sign in</h2>
            <form id="formLogin">
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input className="form-control" name="email" type="text" placeholder="Email address"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" name="password" type="password" placeholder="password" onKeyPress={onKeyPress}></input>
                    <small className="form-text text-muted">Forgot your password? Click <a href="#">here.</a></small>
                </div>
            </form>
            <button className="btn btn-primary">Submit</button>
        </div>

    );

}

export default SignIn;