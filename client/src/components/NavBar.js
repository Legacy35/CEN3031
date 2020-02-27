import React from 'react';

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

    return (
        <div className="row">
        <div className="col col-1 col-md-4"></div>
        <div className="col col-10 col-md-4 center btn-group" role="group" aria-label="Basic example">
          <button type="button" onClick={signup} className={"btn " + (props.views.signup ? "btn-primary" : "btn-secondary")}>Sign up</button>
          <button type="button" onClick={signin} className={"btn " + (props.views.login ? "btn-primary" : "btn-secondary")}>Sign in</button>
          <button type="button" onClick={userSummary} className={"btn " + (props.views.userProfile ? "btn-primary" : "btn-secondary")}>User summary</button>
        </div>
        <div className="col col-1 col-md-4"></div>
      </div>
    );

}

export default NavBar;