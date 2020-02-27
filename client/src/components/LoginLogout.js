import React from 'react';
import Cookies from 'universal-cookie'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {faUser as faUserSolid} from '@fortawesome/free-solid-svg-icons';
import {faUser as faUserRegular} from '@fortawesome//free-regular-svg-icons';

const LoginLogout = (props) => {

    const cookies = new Cookies();

    const style = {
        borderBottom: "2px solid black",
        borderLeft: "2px solid black", 
        borderRadius: "0px 0px 0px 15px",
        position: "absolute",
        top: "0px",
        right: "0px",
        fontSize: "32pt",
        padding: "5px"
    };

    const logout = () => {
        cookies.remove('token');
        props.setToken(undefined);
        props.setUserData({});
    }

    const onClick = () => {
        if (cookies.get('token') || props.token) {
            logout();
        } else {
            let keys = Object.keys(props.views);
            let newViews = { ...props.views };
            for (let i = 0; i < keys.length; i++) {
                newViews[keys[i]] = false;
            }
            newViews.login = true;
            props.setViews(newViews);
        }
    }

    return (
        <button style={style} onClick={onClick} className="btn btn-primary">
            <FontAwesomeIcon icon={props.token ? faUserSolid : faUserRegular} />
        </button>
    );

}

export default LoginLogout;