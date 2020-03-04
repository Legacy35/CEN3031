import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Form from './generic/Form.js';

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

    return <Form id={"formLogin"} labelColWidth={3} inputColWidth={9} onSubmit={login} inputs={inputs}/>;

}

export default SignIn;