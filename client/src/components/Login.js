import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const Login = (props) => {


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
                    console.log(res.data);
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

        <div className="tile view">
            <div className="form center">
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