import React from 'react';

import Cookies from 'universal-cookie';

const cookies = new Cookies();

const NavBar = (props) => {

  const hideAll = () => {
    let keys = Object.keys(props.views);
    let views = {...props.views};
    for(let i = 0; i < keys.length; i++){
      views[keys[i]] = false;
    }
    return views;
  }

  const signup = () => {
    props.setViews({...hideAll(), signup: true});
  }

  const signin = () => {
    props.setViews({...hideAll(), login: true});
  }

  const userSummary = () => {
    props.setViews({...hideAll(), userProfile: true});
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
  
  const logout = () => {
    cookies.remove('token');
    props.setToken(undefined);
    props.setUserData({});
}

  const selectedStyle={
    color: "red",
    backgroundColor: "black"
  };

  return (
    <div id="navbar" className="outline">
       <ul className="navbar">
        <button type="button" className="navbar" style={props.views.signup ? selectedStyle : {}} onClick={signup}>Sign up</button>
        <button type="button" className="navbar" style={props.views.login ? selectedStyle : {}} onClick={signin}>Sign in</button>
        <button type="button" className="navbar" style={props.views.userProfile ? selectedStyle : {}} onClick={userSummary}>User Profile</button>
        <button type="button" className="navbar float-right" onClick={onClick}>
          <i className={(cookies.get('token') ? "fas" : "far") + " fa-user"}></i>
        </button>
       </ul>
    </div>
  );


}

export default NavBar;